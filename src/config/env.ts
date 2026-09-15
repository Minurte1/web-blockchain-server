import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z.string().url().default("mongodb://127.0.0.1:27017/certificate-blockchain"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  BLOCKCHAIN_RPC_URL: z.string().url().default("http://127.0.0.1:8545"),
  BLOCKCHAIN_CHAIN_ID: z.coerce.number().int().positive().default(31337),
  CERTIFICATE_CONTRACT_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  BLOCKCHAIN_PRIVATE_KEY: z.string().regex(/^0x[a-fA-F0-9]{64}$/).optional()
});

export type AppEnvironment = z.infer<typeof environmentSchema>;

export function loadEnvironment(source: NodeJS.ProcessEnv = process.env): AppEnvironment {
  return environmentSchema.parse(source);
}
