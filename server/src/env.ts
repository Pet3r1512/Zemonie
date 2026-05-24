import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
}));

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    TRUSTED_ORIGIN: z.string()
});
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error("Invalid environment variables:", error.format());
    process.exit(1);
}

export { env };