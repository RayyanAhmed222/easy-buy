import crypto from "crypto";
import userModel from "../models/userModel.js";
import {
    setPendingSignup,
    getPendingSignup,
    incrementPendingAttempts,
    deletePendingSignup
} from "../utils/pendingSignups.js";
import { sendSignupPinEmail } from "../utils/sendPinEmail.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import {
    encryptSecret,
    decryptSecret,
    generateTotpSetup,
    verifyTotpToken
} from "../utils/mfaHelper.js";

const BCRYPT_ROUNDS = 12;
const PIN_EXPIRY_MS = 10 * 60 * 1000;
const MAX_PIN_ATTEMPTS = 5;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAuthToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, mfaVerified: true },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const createMfaChallengeToken = (userId) => {
    return jwt.sign(
        { id: userId, purpose: "mfa_challenge" },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
    );
};

const generateSixDigitPin = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const hashPin = async (pin) => {
    return bcrypt.hash(pin, 10);
};

// Google Sign-In / Sign-Up (existing user logs in directly; new user gets Gmail PIN)
const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ success: false, message: "Google credential is required" });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const normalizedEmail = payload?.email?.trim().toLowerCase();

        if (!normalizedEmail || !payload?.email_verified) {
            return res.status(401).json({ success: false, message: "Google email is not verified" });
        }

        const existingUser = await userModel.findOne({ email: normalizedEmail });

        if (existingUser) {
            if (!existingUser.googleId) {
                existingUser.googleId = payload.sub;
                await existingUser.save();
            }
            const token = createAuthToken(existingUser);
            return res.json({
                success: true,
                token,
                message: "Signed in with Google!"
            });
        }

        const pin = generateSixDigitPin();
        const pinHash = await hashPin(pin);
        const fallbackName = normalizedEmail.split("@")[0];

        setPendingSignup(
            normalizedEmail,
            {
                name: payload.name?.trim() || fallbackName,
                email: normalizedEmail,
                password: null,
                authProvider: "google",
                googleId: payload.sub,
                pinHash,
                attempts: 0
            },
            PIN_EXPIRY_MS
        );

        await sendSignupPinEmail(normalizedEmail, pin);

        return res.json({
            success: true,
            requiresPin: true,
            email: normalizedEmail,
            message: "Verification PIN sent to your Gmail."
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid or expired Google token" });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        const user = await userModel.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (!user.password) {
            return res.status(401).json({ success: false, message: "Please sign in with Google for this account" });
        }

        const isMatch = await bcrypt.compare(password || "", user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createAuthToken(user);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Step 1 of Manual Sign-Up: validate & send 6-digit PIN to Gmail
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: "Please enter your name" });
        }

        const exists = await userModel.findOne({ email: normalizedEmail });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
        const pin = generateSixDigitPin();
        const pinHash = await hashPin(pin);

        setPendingSignup(
            normalizedEmail,
            {
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                authProvider: "local",
                googleId: null,
                pinHash,
                attempts: 0
            },
            PIN_EXPIRY_MS
        );

        await sendSignupPinEmail(normalizedEmail, pin);

        return res.status(200).json({
            success: true,
            requiresPin: true,
            email: normalizedEmail,
            message: "Verification PIN sent to your Gmail."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to send verification PIN" });
    }
};

// Step 2 of Sign-Up: verify PIN & create user in MongoDB
const verifySignupPin = async (req, res) => {
    try {
        const { email, pin } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !pin) {
            return res.status(400).json({ success: false, message: "Email and PIN are required" });
        }

        const pending = getPendingSignup(normalizedEmail);
        if (!pending) {
            return res.status(400).json({ success: false, message: "PIN expired or not found. Please sign up again." });
        }

        if (pending.attempts >= MAX_PIN_ATTEMPTS) {
            deletePendingSignup(normalizedEmail);
            return res.status(429).json({ success: false, message: "Too many wrong PIN attempts. Sign up again." });
        }

        const isPinValid = await bcrypt.compare(String(pin).trim(), pending.pinHash);
        if (!isPinValid) {
            incrementPendingAttempts(normalizedEmail);
            return res.status(401).json({ success: false, message: "Invalid PIN" });
        }

        const alreadyExists = await userModel.findOne({ email: normalizedEmail });
        if (alreadyExists) {
            deletePendingSignup(normalizedEmail);
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const newUserData = {
            name: pending.name,
            email: pending.email,
            authProvider: pending.authProvider,
            googleId: pending.googleId,
            role: "user"
        };

        if (pending.authProvider === "local" && pending.password) {
            newUserData.password = pending.password;
        }

        const user = await new userModel(newUserData).save();
        deletePendingSignup(normalizedEmail);

        const token = createAuthToken(user);
        return res.status(201).json({
            success: true,
            token,
            message: "Account verified and created!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Admin Login (Step 1: Email + Password -> Step 2: MFA code if enabled)
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        const admin = await userModel.findOne({ email: normalizedEmail, role: "admin" });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        const isMatch = await bcrypt.compare(password || "", admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        if (admin.mfaEnabled && admin.mfaSecret) {
            const mfaToken = createMfaChallengeToken(admin._id);
            return res.json({
                success: true,
                mfaRequired: true,
                mfaToken,
                message: "Authenticator code required"
            });
        }

        // If admin hasn't enabled MFA yet, issue token but flag setup required
        const token = createAuthToken(admin);
        return res.json({
            success: true,
            mfaRequired: false,
            mfaSetupRecommended: true,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Setup MFA (generates QR code for authenticator app)
const setupMfa = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { base32, qrCodeDataUrl } = await generateTotpSetup(user.email);
        user.mfaSecret = encryptSecret(base32);
        await user.save();

        return res.json({
            success: true,
            qrCodeDataUrl,
            manualKey: base32
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Enable MFA after first code check
const enableMfa = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await userModel.findById(req.userId);
        if (!user || !user.mfaSecret) {
            return res.status(400).json({ success: false, message: "MFA setup not initialized" });
        }

        const secret = decryptSecret(user.mfaSecret);
        if (!verifyTotpToken(secret, code)) {
            return res.status(401).json({ success: false, message: "Invalid authenticator code" });
        }

        user.mfaEnabled = true;
        await user.save();

        return res.json({ success: true, message: "MFA enabled successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Verify MFA during login using mfaToken + 6-digit TOTP code
const verifyLoginMfa = async (req, res) => {
    try {
        const { mfaToken, code } = req.body;
        if (!mfaToken || !code) {
            return res.status(400).json({ success: false, message: "MFA token and code are required" });
        }

        const decoded = jwt.verify(mfaToken, process.env.JWT_SECRET);
        if (decoded.purpose !== "mfa_challenge") {
            return res.status(401).json({ success: false, message: "Invalid MFA challenge token" });
        }

        const user = await userModel.findById(decoded.id);
        if (!user || !user.mfaEnabled || !user.mfaSecret) {
            return res.status(401).json({ success: false, message: "MFA not active for this account" });
        }

        const secret = decryptSecret(user.mfaSecret);
        if (!verifyTotpToken(secret, code)) {
            return res.status(401).json({ success: false, message: "Invalid authenticator code" });
        }

        const token = createAuthToken(user);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Expired or invalid MFA session" });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password -mfaSecret");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (name && name.trim() !== "") {
            user.name = name.trim();
        }

        if (email && email.trim() !== "") {
            const newEmail = email.trim().toLowerCase();
            if (!validator.isEmail(newEmail)) {
                return res.status(400).json({ success: false, message: "Please enter a valid email" });
            }

            const emailExists = await userModel.findOne({
                email: newEmail,
                _id: { $ne: req.userId }
            });
            if (emailExists) {
                return res.status(409).json({ success: false, message: "Email is already in use" });
            }

            user.email = newEmail;
        }

        if (newPassword && newPassword.trim() !== "") {
            if (!user.password) {
                return res.status(400).json({ success: false, message: "Password cannot be changed for Google-only accounts" });
            }

            if (!currentPassword) {
                return res.status(400).json({ success: false, message: "Current password is required" });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Current password is incorrect" });
            }

            if (newPassword.length < 8) {
                return res.status(400).json({ success: false, message: "New password must be at least 8 characters" });
            }

            user.password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
        }

        await user.save();
        return res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    googleLogin,
    loginUser,
    registerUser,
    verifySignupPin,
    adminLogin,
    setupMfa,
    enableMfa,
    verifyLoginMfa,
    getProfile,
    updateProfile
};