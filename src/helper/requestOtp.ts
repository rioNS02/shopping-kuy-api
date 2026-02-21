import { transporter } from "./transporterEmail";
import "dotenv/config";

export const requestOtp = async (userEmail: string) => {
  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: userEmail,
  });
};
