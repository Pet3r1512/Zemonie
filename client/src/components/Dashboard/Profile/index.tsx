import AvatarSprites from "@/components/Dashboard/Setup/AvatarSprites";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import useVerificationCooldown from "@/hooks/users/useVerificationCooldown";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import EmailVerifyDialog from "./EmailVerifyDialog";
import { CalendarPlus2, CheckCircle, Lock, Mail, ShieldAlert, User } from "lucide-react";
import { useState } from "react";

const profileFields = [
  { label: "Name", key: "name", icon: User },
  { label: "Email", key: "email", icon: Mail },
  {
    label: "Joined",
    key: "join",
    icon: CalendarPlus2,
  },
  { label: "Sign-in Method", key: "method", icon: Lock },
];

export default function ProfilePage() {
  const session = authClient.useSession();
  const { data } = useUserPreferences();
  const { remaining, isCoolingDown, startCooldown } = useVerificationCooldown();
  const [dialogOpen, setDialogOpen] = useState(false);

  const emailVerified = session.data?.user.emailVerified as boolean | undefined;

  const fieldValues: Record<string, string> = {
    email: session.data?.user.email ?? "",
    method: "Email and Password",
    name: session.data?.user.name ?? "",
    join: session.data?.user.createdAt.toLocaleString().split(",")[0] ?? "",
  };

  return (
    <div className="max-w-2xl w-full mx-auto space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="size-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
          <svg width={72} height={72} viewBox="0 0 100 100">
            <use href={`#avatar-${data?.preferences.avatar ?? "fox"}`} />
          </svg>
        </div>
        <AvatarSprites />
        <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {data?.preferences.avatar ?? "fox"}
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-bg md:shadow-2xl border border-gray-200 dark:border-dark-card divide-y divide-gray-100 dark:divide-dark-card">
        {profileFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex items-center gap-4 px-6 py-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              {field.key === "email" ? (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{field.label}</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {fieldValues[field.key]}
                    </p>
                  </div>
                  {emailVerified ? (
                    <Badge
                      variant="secondary"
                      className="gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                    >
                      <CheckCircle className="size-3" />
                      Verified
                    </Badge>
                  ) : isCoolingDown ? (
                    <Badge variant="secondary" className="gap-1">
                      Resend in {remaining}s
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
                      onClick={() => setDialogOpen(true)}
                    >
                      <ShieldAlert className="size-3" />
                      Verify
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{field.label}</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {fieldValues[field.key]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <EmailVerifyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        email={fieldValues.email}
        onSent={startCooldown}
      />
    </div>
  );
}
