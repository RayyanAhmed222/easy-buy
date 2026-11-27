import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.purpose === "mfa_challenge") {
            return res.status(401).json({ success: false, message: "Complete MFA verification first" });
        }

        const user = await userModel.findById(decoded.id).select("role mfaEnabled");
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access required" });
        }

        req.userId = user._id;
        req.userRole = user.role;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default adminAuth;