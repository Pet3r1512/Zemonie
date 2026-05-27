import { SERVER_URL } from "@/constant/auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },
});
