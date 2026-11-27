import { Resend } from "resend";

const sendSignupPinEmail = async (toEmail, pin) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY is missing in environment variables");
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.EMAIL_FROM || "EASYBUY <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
        from: fromAddress,
        to: [toEmail],
        subject: "EASYBUY - Your Sign-Up Verification PIN",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
                <h2 style="margin-bottom: 8px;">Verify your EASYBUY account</h2>
                <p style="margin: 0 0 16px;">Use this 6-digit PIN to complete your sign-up:</p>
                <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 12px 18px; background: #f4f4f2; display: inline-block; border-radius: 8px;">
                    ${pin}
                </div>
                <p style="margin-top: 16px; font-size: 12px; color: #666;">This PIN expires in 10 minutes.</p>
            </div>
        `
    });

    if (error) {
        throw new Error(error.message || "Failed to send verification PIN");
    }
};

export { sendSignupPinEmail };