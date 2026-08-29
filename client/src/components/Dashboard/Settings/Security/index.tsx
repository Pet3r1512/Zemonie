import { Separator } from "@/components/ui/separator";
import UpdatePassword from "./UpdatePassword";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

interface Account {
  accountId: string;
  providerId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  scopes: string[];
}

export default function Security() {
  const accountsQuery = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await authClient.listAccounts();
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (!accountsQuery.data?.data || accountsQuery.data.data.length === 0) {
    return;
  }

  const account = {
    ...accountsQuery.data.data[0],
    createdAt:
      accountsQuery.data.data[0].createdAt instanceof Date
        ? accountsQuery.data.data[0].createdAt.toISOString()
        : accountsQuery.data.data[0].createdAt,
    updatedAt:
      accountsQuery.data.data[0].updatedAt instanceof Date
        ? accountsQuery.data.data[0].updatedAt.toISOString()
        : accountsQuery.data.data[0].updatedAt,
  } as Account;

  const createdAt = new Date(account.createdAt);
  const updatedAt = new Date(account.updatedAt);

  const nextUpdateAt = new Date(updatedAt);
  nextUpdateAt.setUTCDate(nextUpdateAt.getUTCDate() + 30);

  const isAllowedToChangePassword =
    createdAt.getTime() === updatedAt.getTime() || new Date() >= nextUpdateAt;
  return (
    <section className="space-y-6">
      <p className="lg:text-lg font-bold text-secondary">Account Security</p>
      <Separator className="dark:bg-white/15 md:max-w-xl lg:max-w-2xl" />
      <p className="text-secondary font-semibold">Update Password</p>
      <UpdatePassword />
    </section>
  );
}
