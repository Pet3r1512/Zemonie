import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.poolQueryViaFetch = true;

let connectionStringOverride: string | undefined;

export function setPrismaConnectionString(cs: string) {
  connectionStringOverride = cs;
}

let prismaClient: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!prismaClient) {
    const connectionString =
      connectionStringOverride ??
      (process.env.NODE_ENV === "development"
        ? process.env.DEV_DATABASE_URL
        : process.env.DATABASE_URL);
    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined");
    }
    const adapter = new PrismaNeon({ connectionString });
    prismaClient = new PrismaClient({ adapter, log: ["error"] });
  }
  return prismaClient;
}

const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return getPrisma()[prop as keyof PrismaClient];
  },
});

export default prisma;
