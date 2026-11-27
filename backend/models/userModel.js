import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        }
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    googleId: { type: String, default: null },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, default: null }, // encrypted TOTP secret
    cartData: { type: Object, default: {} }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;