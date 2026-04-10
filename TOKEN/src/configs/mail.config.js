import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
//   host: testAccount.smtp.host,
//   port: testAccount.smtp.port,
//   secure: testAccount.smtp.secure,
service: "gmail",
  auth: {
    pass: process.env.GOOGLE_APP_PASSWORD,
    user: process.env.GOOGLE_APP_EMAIL,
  },
});

export default transporter;
