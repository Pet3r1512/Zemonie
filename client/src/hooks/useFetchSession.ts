import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function useFetchSession() {
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession({
        fetchOptions: {
          credentials: "include",
        },
      });
      return session;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return sessionQuery;
}
