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
  return (
    <section className="space-y-6">
      <p className="lg:text-lg font-bold text-secondary">Account Security</p>
      <Separator className="dark:bg-white/15 md:max-w-xl lg:max-w-2xl" />
      <p className="text-secondary font-semibold">Update Password</p>
      <UpdatePassword />
    </section>
  );
}
