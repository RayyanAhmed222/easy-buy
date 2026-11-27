import crypto from "crypto";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const getEncryptionKey = () => {
    const rawKey = process.env.MFA_ENCRYPTION_KEY || process.env.JWT_SECRET;
    return crypto.createHash("sha256").update(rawKey).digest(); // 32 bytes
};

export const encryptSecret = (plainText) => {
    const iv = crypto.randomBytes(12);
    const key = getEncryptionKey();
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decryptSecret = (cipherText) => {
    const [ivHex, authTagHex, encryptedHex] = cipherText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const key = getEncryptionKey();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
};

export const generateTotpSetup = async (email, appName = "StoreAdmin") => {
    const secret = speakeasy.generateSecret({
        name: `${appName} (${email})`,
        length: 20
    });
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url);
    return {
        base32: secret.base32,
        qrCodeDataUrl
    };
};

export const verifyTotpToken = (base32Secret, token) => {
    return speakeasy.totp.verify({
        secret: base32Secret,
        encoding: "base32",
        token: String(token).trim(),
        window: 1 // +-30s clock drift tolerance
    });
};