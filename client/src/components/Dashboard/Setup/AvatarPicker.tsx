// AvatarPicker.tsx
import convertHexToAlpha from "@/helpers/convertHexToAlpha";
import useScreenSize from "@/hooks/useScreenSize";
import { cn, } from "@/lib/utils";
import AvatarSprite from "./AvatarSprites";

const avatars = [
  "fox",
  "cat",
  "panda",
  "bunny",
  "dino",
  "bear",
  "robot",
  "shroom",
  "fish",
  "owl",
] as const;

const avatarColors: Record<AvatarId, string> = {
  fox: "#FFD05B",
  cat: "#B3D9F7",
  panda: "#D9F5D6",
  bunny: "#7C85D8",
  dino: "#5DBD6A",
  bear: "#EDE7F6",
  robot: "#A8D8E8",
  shroom: "#FFF0F5",
  fish: "#D6F1FF",
  owl: "#534AB7",
};

export type AvatarId = (typeof avatars)[number];

interface AvatarPickerProps {
  value?: AvatarId;
  onChange?: (avatar: AvatarId,) => void;
  size?: number;
  className?: string;
}

export default function AvatarPicker(
  { value, onChange, size = 72, className, }: AvatarPickerProps,
) {
  const { screenSize, } = useScreenSize();

  const avatarSize = screenSize === "xs" || screenSize === "sm"
    ? 48
    : screenSize === "md"
    ? 64
    : size;

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5",
        className,
      )}
    >
      {avatars.map((avatar,) => {
        const selected = value === avatar;

        return (
          <button
            key={avatar}
            type="button"
            onClick={() => onChange?.(avatar,)}
            style={{
              backgroundColor: convertHexToAlpha(avatarColors[avatar], selected ? 0.31 : 0.15,),
              borderColor: selected ? avatarColors[avatar] : undefined,
            }}
            className={cn(
              "rounded-xl border p-2 transition-all duration-200 hover:scale-[1.02] flex flex-col items-center min-h-30",
              selected ? "shadow-2xl scale-110" : "",
            )}
          >
            <div className="flex items-center justify-center w-full flex-1">
              <svg
                width={avatarSize}
                height={avatarSize}
                viewBox="0 0 100 100"
                className="shrink-0"
              >
                <use href={`#avatar-${avatar}`} />
              </svg>
            </div>

            <p className="mt-1 text-xs font-medium capitalize">{avatar}</p>
          </button>
        );
      },)}

      <AvatarSprite />
    </div>
  );
}
