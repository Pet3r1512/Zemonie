import { useQuery, } from "@tanstack/react-query";
import { Tag, } from "lucide-react";

export default function VersionTag() {
  const { data: latestTag, isPending, } = useQuery({
    queryKey: ["latest-tag",],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/Pet3r1512/Zemonie/tags",);

      if (!response.ok) {
        throw new Error("Failed to fetch latest tag",);
      }

      const tags = await response.json();

      return tags[0]?.name ?? "";
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },);

  return (
    <div className="flex items-center gap-x-1.5 text-gray-600 dark:text-gray-400 cursor-default">
      <Tag size={12} />

      <p className="text-xs md:text-sm font-semibold">{isPending ? "Loading..." : latestTag}</p>
    </div>
  );
}
