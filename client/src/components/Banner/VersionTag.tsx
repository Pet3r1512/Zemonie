import { Tag } from "lucide-react";

export default function VersionTag({ version }: { version: string }) {
  return (
    <div className="flex items-center gap-x-1.5 text-gray-600 cursor-default">
      <Tag size={12} />
      <p className="text-xs md:text-sm font-semibold">{version}</p>
    </div>
  );
}
