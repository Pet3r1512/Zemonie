import { SERVER_URL } from "@/constant/auth";
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: SERVER_URL,
  plugins: [inferAdditionalFields({
    user: {
      isSetupDone: {
        type: "boolean",
      },
    },
  }),],
  fetchOptions: {
    credentials: "include",
  },
});
