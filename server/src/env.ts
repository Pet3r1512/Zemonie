import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).optional(),
  DATABASE_URL: z.string().url(),
  DEV_DATABASE_URL: z.string().url(),
  TRUSTED_ORIGIN: z.string().optional(),
});

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("Invalid environment variables:", error.format());
}

export { env };
