import express from "express";
import rateLimit from "express-rate-limit";
import {
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
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

const adminAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // max 3 admin attempts per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many admin login attempts. Try again after 15 minutes." }
});

const userAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 user login/register/pin attempts per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many login attempts. Try again after 15 minutes." }
});

const googleAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // max 5 Google sign-in attempts per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many Google sign-in attempts. Try again after 15 minutes." }
});

userRouter.post("/google-login", googleAuthLimiter, googleLogin);
userRouter.post("/register", userAuthLimiter, registerUser);
userRouter.post("/verify-signup-pin", userAuthLimiter, verifySignupPin);
userRouter.post("/login", userAuthLimiter, loginUser);
userRouter.post("/admin", adminAuthLimiter, adminLogin);
userRouter.post("/mfa/verify", adminAuthLimiter, verifyLoginMfa);

userRouter.post("/mfa/setup", adminAuth, setupMfa);
userRouter.post("/mfa/enable", adminAuth, enableMfa);

userRouter.get("/profile", auth, getProfile);
userRouter.put("/profile", auth, updateProfile);

export default userRouter;