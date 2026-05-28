import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.poolQueryViaFetch = true;

let _connectionString: string | undefined;

export function setPrismaConnectionString(cs: string) {
    _connectionString = cs;
}

let _prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
    if (!_prisma) {
        const connectionString = _connectionString ?? (process.env.NODE_ENV === "development" ? process.env.DEV_DATABASE_URL : process.env.DATABASE_URL);
        if (!connectionString) {
            throw new Error("DATABASE_URL is not defined");
        }
        const adapter = new PrismaNeon({ connectionString });
        _prisma = new PrismaClient({ adapter, log: ["error"] });
    }
    return _prisma;
}

const prisma = new Proxy({} as PrismaClient, {
    get(_, prop) {
        return getPrisma()[prop as keyof PrismaClient];
    },
});

export default prisma;