import { Mail, Lock, User, CalendarPlus2 } from "lucide-react";
import AvatarSprites from "@/components/Dashboard/Setup/AvatarSprites";
import { authClient } from "@/lib/auth-client";

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
            <use href={`#avatar-${session.data?.user?.image ?? "fox"}`} />
          </svg>
        </div>
        <AvatarSprites />
        <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {session.data?.user?.image ?? "fox"}
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-neutral-950 md:shadow-2xl border border-gray-200 dark:border-neutral-800 divide-y divide-gray-100 dark:divide-neutral-800">
        {profileFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex items-center gap-4 px-6 py-5">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {field.label}
                </p>
                <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                  {fieldValues[field.key]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
