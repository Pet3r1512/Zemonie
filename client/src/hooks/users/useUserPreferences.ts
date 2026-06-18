import getUserPreferences from "@/api/users/getUserPreferences";
import { useQuery, } from "@tanstack/react-query";

export default function useUserPreferences() {
  const { data, isLoading, isError, } = useQuery({
    queryKey: ["preferences",],
    queryFn: () => getUserPreferences(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  },);

  return { data, isLoading, isError, };
}
