import { SERVER_URL } from "@/constant/auth";
import { createAuthClient } from "better-auth/react";
import { withRetryAfterInBody } from "./auth-errors";

export const authClient = createAuthClient({
  baseURL: SERVER_URL,
  fetchOptions: {
    credentials: "include",
    customFetchImpl: async (input, init) => withRetryAfterInBody(await fetch(input, init)),
  },
});
