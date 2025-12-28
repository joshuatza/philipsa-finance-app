import {
  adminClient,
  apiKeyClient,
  emailOTPClient,
  organizationClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const clientPlugins: any[] = [
  adminClient(),
  apiKeyClient(),
  twoFactorClient(),
  usernameClient(),
  organizationClient(),
  phoneNumberClient(),
  emailOTPClient(),
];
export const authClient: any = createAuthClient({
  plugins: clientPlugins,
});
