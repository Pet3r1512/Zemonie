import { UpdatePassswordFormType } from "@/components/Dashboard/Settings/Security/UpdatePassword";
import { authClient } from "@/lib/auth-client";

export default async function ChangePassword(credentials: UpdatePassswordFormType) {
  const { data, error } = await authClient.changePassword({
    currentPassword: credentials.currentPassword,
    newPassword: credentials.newPassword,
    revokeOtherSessions: true,
  });

  if (error) {
    throw new Error(error.message || "Update password failed");
  }

  return data;
}
