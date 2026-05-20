import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export default function useFetchUser() {
  const { data: sessionData } = useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      try {
        // Get the session from the auth client
        const session = await authClient.getSession(); // or .useSession() depending on your client
        if (!session || !session.data?.session.userId || session === null) {
          throw new Error("No active session");
        }

        return session;
      } catch (err) {
        console.error("Failed to fetch session:", err);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });

  return sessionData?.data?.session.userId;
}
