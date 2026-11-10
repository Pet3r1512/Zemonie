import AvatarSprites from "@/components/Dashboard/Setup/AvatarSprites";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import useVerificationCooldown from "@/hooks/users/useVerificationCooldown";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import EmailVerifyDialog from "./EmailVerifyDialog";
import { CalendarPlus2, CheckCircle, Lock, Mail, ShieldAlert, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { data: sessionData, refetch: refetchSession } = authClient.useSession();
  const { data } = useUserPreferences();
  const { remaining, isCoolingDown, startCooldown } = useVerificationCooldown();
  const [dialogOpen, setDialogOpen] = useState(false);

  const emailVerified = sessionData?.user.emailVerified as boolean | undefined;

  useEffect(() => {
    authClient.updateSession();
  }, [refetchSession, sessionData]);

  const fieldValues: Record<string, string> = {
    email: sessionData?.user.email ?? "",
    method: "Email and Password",
    name: sessionData?.user.name ?? "",
    join: sessionData?.user.createdAt.toLocaleString().split(",")[0] ?? "",
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
        <p className="font-display font-bold text-lg text-gray-900 dark:text-white capitalize">
          {data?.preferences.avatar ?? "fox"}
        </p>
      </div>

      <div className="rounded-[14px] border border-gray-200 bg-white shadow-sm divide-y divide-gray-100 dark:divide-white/[0.07] dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl">
        {profileFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex items-center gap-4 px-3 py-2 md:px-6 md:py-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              {field.key === "email" ? (
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-[#b5b3b2]">{field.label}</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white truncate max-w-7/8 md:max-w-none">
                      {fieldValues[field.key]}
                    </p>
                  </div>
                  {emailVerified ? (
                    <Badge
                      variant="secondary"
                      className="gap-1 border-green-300 bg-green-100 text-green-700 cursor-default dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300"
                    >
                      <CheckCircle className="size-3" />
                      Verified
                    </Badge>
                  ) : isCoolingDown ? (
                    <Badge variant="secondary" className="gap-1">
                      Resend in {remaining}s
                    </Badge>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="secondary"
                          className="gap-1 cursor-pointer border-red-300 bg-red-100 text-red-700 hover:bg-red-100 dark:border-red-400/30 dark:bg-red-400/15 dark:text-red-300 dark:hover:bg-red-400/20"
                          onClick={() => setDialogOpen(true)}
                        >
                          <ShieldAlert className="size-3" />
                          Verify
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your email is not verified</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 dark:text-[#b5b3b2]">{field.label}</p>
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
