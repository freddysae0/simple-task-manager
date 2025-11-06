import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
});

// eslint-disable-next-line node/no-process-env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const missingValues = parsedEnv.error.issues.map(issue => issue.path.join("."));
  console.error("Missing environment variables:", missingValues.length ? missingValues : parsedEnv.error.message);
  process.exit(1);
}

export type Env = z.infer<typeof envSchema>;
export const env: Env = parsedEnv.data;
