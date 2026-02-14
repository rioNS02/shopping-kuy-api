import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";
import "dotenv/config";

const adminPanel = async () => {
  const adminPass = process.env.ADMIN_PASS!;
  const adminEmail = process.env.ADMIN_EMAIL!;

  const hashedPasswordAdmin = await bcrypt.hash(adminPass, 10);
  await prisma.user.create({
    data: {
      username: "admin",
      firstName: "Super",
      lastName: "Admin",
      email: adminEmail,
      password: hashedPasswordAdmin,
      role: "ADMIN",
    },
  });

  console.log("Admin created.");
};

adminPanel();
