import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const conn = `${process.env.DATABASE_URL}`;

const adapter = new PrismaMariaDb(conn);

export const prisma = new PrismaClient({ adapter });
