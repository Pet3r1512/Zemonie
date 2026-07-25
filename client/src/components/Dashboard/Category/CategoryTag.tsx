import { cn } from "@/lib/utils";
import categoryColorDictionary from "@/types/CategoryDict";

export default function CategoryTag({ categoryId }: { categoryId: string }) {
  return (
    <p
      className={cn(
        categoryColorDictionary[categoryId].color,
        "text-xs truncate md:text-md max-w-fit px-2 py-1 rounded-lg text-white/90 cursor-default",
      )}
    >
      {categoryColorDictionary[categoryId].name}
    </p>
  );
}
