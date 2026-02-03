import nodemailer, { type SentMessageInfo } from "nodemailer";
import "dotenv/config";

interface Mail {
  (email: string, subject: string, text: string): Promise<SentMessageInfo>;
}

export const sendEmail: Mail = async (
  email: string,
  subject: string,
  text: string,
): Promise<SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  });

  return mailOptions;
};
