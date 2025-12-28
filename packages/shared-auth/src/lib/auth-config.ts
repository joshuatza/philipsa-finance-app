import { env } from "node:process";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  apiKey,
  emailOTP,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
  username,
} from "better-auth/plugins";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "../schema/auth-schema.js";

// Database connection
const pool = new Pool({
  connectionString: env.DATABASE_URL || "",
});

const drizzleClient = drizzle(pool, { schema });

export const dbAdapter = drizzleAdapter(drizzleClient, {
  provider: "pg",
});

// Plugins
export const authPlugins: any[] = [
  admin(),
  apiKey(),
  twoFactor(),
  username(),
  organization(),
  phoneNumber({
    sendOTP: async () => {
      // TODO: Implement Telegram message sending
      // Params: { phoneNumber, code }
    },
  }),
  emailOTP({
    async sendVerificationOTP() {
      // TODO: Implement email sending
      // Params: { email, otp, type }
    },
  }),
  openAPI(),
  nextCookies(),
];
