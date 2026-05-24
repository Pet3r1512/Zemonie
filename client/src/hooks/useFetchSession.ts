import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function useFetchSession() {
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: () => {
      const session = authClient.useSession()
      return session;
    },
  });

  return sessionQuery;
}
