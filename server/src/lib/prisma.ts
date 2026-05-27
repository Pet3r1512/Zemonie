import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.poolQueryViaFetch = true;

const connectionString = process.env.NODE_ENV === "development" ? process.env.DEV_DATABASE_URL : process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({
    adapter,
    log: ["error"],
});

export default prisma;