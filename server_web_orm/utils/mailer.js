import nodemailer from "nodemailer";

export const sendVerificationEmail = async (toEmail, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Admin Website" <${process.env.MAIL_USER}>`,
      to: toEmail,
      subject: "Email Verification - OTP Code",
      html: `
        <h3>Welcome to my website!</h3>
        <p>Your verification code is:</p>
        <h2 style="color: #2e6c80;">${otpCode}</h2>
        <p>This code will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
