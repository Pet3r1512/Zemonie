// AvatarPicker.tsx
import useScreenSize from "@/hooks/useScreenSize";
import { cn } from "@/lib/utils";

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

export type AvatarId = (typeof avatars)[number];

interface AvatarPickerProps {
  value?: AvatarId;
  onChange?: (avatar: AvatarId) => void;
  size?: number;
  className?: string;
}

export default function AvatarPicker({
  value,
  onChange,
  size = 72,
  className,
}: AvatarPickerProps) {
  const { screenSize } = useScreenSize();

  if (screenSize === "sm") {
    size = 48;
  } else if (screenSize === "md") {
    size = 64;
  }
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5",
        className,
      )}
    >
      {avatars.map((avatar) => {
        const selected = value === avatar;

        return (
          <button
            key={avatar}
            type="button"
            onClick={() => onChange?.(avatar)}
            className={cn(
              "rounded-xl border p-2 transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center",
              selected
                ? "border-primary bg-primary/0"
                : "border-border hover:border-primary/40",
            )}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 100 100"
              className="mx-auto"
            >
              <use href={`#avatar-${avatar}`} />
            </svg>

            <p className="mt-1 text-xs font-medium capitalize">{avatar}</p>
          </button>
        );
      })}

      <AvatarSprite />
    </div>
  );
}

function AvatarSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      {/* 1. Sunny Fox */}
      <symbol id="avatar-fox" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#FFD05B" />
        <ellipse cx="50" cy="88" rx="30" ry="18" fill="#F4A43C" />
        <circle cx="50" cy="50" r="28" fill="#F4A43C" />
        <polygon points="28,35 22,16 38,32" fill="#F4A43C" />
        <polygon points="72,35 78,16 62,32" fill="#F4A43C" />
        <polygon points="29,33 24,20 37,31" fill="#FFB3A7" />
        <polygon points="71,33 76,20 63,31" fill="#FFB3A7" />
        <ellipse cx="50" cy="58" rx="13" ry="9" fill="#FFEAC8" />
        <circle cx="42" cy="47" r="5" fill="#fff" />
        <circle cx="58" cy="47" r="5" fill="#fff" />
        <circle cx="43" cy="47" r="3" fill="#3C2A1E" />
        <circle cx="59" cy="47" r="3" fill="#3C2A1E" />
        <circle cx="44" cy="46" r="1" fill="#fff" />
        <circle cx="60" cy="46" r="1" fill="#fff" />
        <ellipse cx="50" cy="56" rx="3" ry="2" fill="#E8645A" />
        <path
          d="M44 62 Q50 67 56 62"
          stroke="#C0503A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="36" cy="55" rx="5" ry="3" fill="#FF9E7D" opacity="0.5" />
        <ellipse cx="64" cy="55" rx="5" ry="3" fill="#FF9E7D" opacity="0.5" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#F4A43C"
          strokeWidth="2"
        />
      </symbol>

      {/* 2. Cool Cat */}
      <symbol id="avatar-cat" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#B3D9F7" />
        <ellipse cx="50" cy="88" rx="30" ry="18" fill="#6AAED6" />
        <rect x="20" y="78" width="60" height="8" rx="3" fill="#4A8FBA" />
        <circle cx="50" cy="46" r="27" fill="#FFEAC8" />
        <polygon points="29,33 24,14 40,30" fill="#FFEAC8" />
        <polygon points="71,33 76,14 60,30" fill="#FFEAC8" />
        <polygon points="30,31 26,20 39,29" fill="#FFB3D9" />
        <polygon points="70,31 74,20 61,29" fill="#FFB3D9" />
        <ellipse cx="50" cy="50" rx="11" ry="8" fill="#fff" />
        <rect x="32" y="39" width="14" height="10" rx="4" fill="#3C2A1E" />
        <rect x="54" y="39" width="14" height="10" rx="4" fill="#3C2A1E" />
        <line
          x1="46"
          y1="43"
          x2="54"
          y2="43"
          stroke="#3C2A1E"
          strokeWidth="1.5"
        />
        <ellipse cx="50" cy="53" rx="3" ry="2" fill="#E8645A" />
        <path
          d="M44 60 Q50 65 56 61"
          stroke="#C0503A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#6AAED6"
          strokeWidth="2"
        />
      </symbol>

      {/* 3. Happy Panda */}
      <symbol id="avatar-panda" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D9F5D6" />
        <ellipse cx="50" cy="86" rx="30" ry="18" fill="#fff" />
        <circle cx="50" cy="48" r="27" fill="#fff" />
        <circle cx="26" cy="26" r="12" fill="#2C2C2A" />
        <circle cx="74" cy="26" r="12" fill="#2C2C2A" />
        <ellipse cx="38" cy="44" rx="10" ry="9" fill="#2C2C2A" />
        <ellipse cx="62" cy="44" rx="10" ry="9" fill="#2C2C2A" />
        <circle cx="38" cy="45" r="6" fill="#fff" />
        <circle cx="62" cy="45" r="6" fill="#fff" />
        <circle cx="38" cy="45" r="3.5" fill="#2C2C2A" />
        <circle cx="62" cy="45" r="3.5" fill="#2C2C2A" />
        <circle cx="39" cy="44" r="1.2" fill="#fff" />
        <circle cx="63" cy="44" r="1.2" fill="#fff" />
        <ellipse cx="50" cy="57" rx="12" ry="8" fill="#F7F3EE" />
        <ellipse cx="50" cy="54" rx="4" ry="3" fill="#2C2C2A" />
        <path
          d="M42 61 Q50 69 58 61"
          stroke="#2C2C2A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="64" y="68" width="5" height="22" fill="#6ABD6A" rx="2" />
        <rect x="62" y="76" width="9" height="3" fill="#5AA85A" rx="1" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#6ABD6A"
          strokeWidth="2"
        />
      </symbol>

      {/* 4. Space Bunny */}
      <symbol id="avatar-bunny" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#1A1A2E" />
        <circle cx="18" cy="16" r="1.2" fill="#fff" opacity="0.8" />
        <circle cx="82" cy="22" r="1" fill="#fff" opacity="0.6" />
        <circle cx="14" cy="72" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="86" cy="80" r="1" fill="#fff" opacity="0.5" />
        <circle cx="88" cy="20" r="1" fill="#fff" opacity="0.6" />
        <ellipse cx="50" cy="85" rx="26" ry="14" fill="#7C85D8" />
        <circle cx="50" cy="50" r="30" fill="#E8E8F0" />
        <ellipse
          cx="50"
          cy="50"
          rx="22"
          ry="22"
          fill="#C5D8FF"
          opacity="0.35"
        />
        <ellipse cx="38" cy="26" rx="5" ry="13" fill="#FFB3CF" />
        <ellipse cx="62" cy="26" rx="5" ry="13" fill="#FFB3CF" />
        <circle cx="50" cy="50" r="20" fill="#FFEAC8" />
        <circle cx="42" cy="47" r="5" fill="#fff" />
        <circle cx="58" cy="47" r="5" fill="#fff" />
        <circle cx="43" cy="47" r="3" fill="#5B3A8C" />
        <circle cx="59" cy="47" r="3" fill="#5B3A8C" />
        <circle cx="44" cy="46" r="1" fill="#fff" />
        <circle cx="60" cy="46" r="1" fill="#fff" />
        <ellipse cx="50" cy="54" rx="3" ry="2" fill="#E8645A" />
        <path
          d="M44 59 Q50 64 56 59"
          stroke="#C0503A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#9DA8D8"
          strokeWidth="2.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#7C85D8"
          strokeWidth="2"
        />
      </symbol>

      {/* 5. Dino Pal */}
      <symbol id="avatar-dino" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D4F5D4" />
        <ellipse cx="50" cy="88" rx="28" ry="16" fill="#5DBD6A" />
        <ellipse cx="50" cy="50" rx="28" ry="24" fill="#5DBD6A" />
        <ellipse cx="50" cy="62" rx="14" ry="10" fill="#4AA855" />
        <polygon points="34,30 30,14 40,28" fill="#E87A45" />
        <polygon points="44,26 42,10 50,25" fill="#E87A45" />
        <polygon points="56,26 56,10 62,25" fill="#E87A45" />
        <polygon points="66,30 68,14 72,29" fill="#E87A45" />
        <circle cx="40" cy="44" r="6" fill="#fff" />
        <circle cx="60" cy="44" r="6" fill="#fff" />
        <circle cx="40" cy="44" r="3.5" fill="#2C4A1E" />
        <circle cx="60" cy="44" r="3.5" fill="#2C4A1E" />
        <circle cx="41" cy="43" r="1.2" fill="#fff" />
        <circle cx="61" cy="43" r="1.2" fill="#fff" />
        <ellipse cx="44" cy="60" rx="2" ry="1.5" fill="#3A8A40" />
        <ellipse cx="56" cy="60" rx="2" ry="1.5" fill="#3A8A40" />
        <path
          d="M38 66 Q50 76 62 66"
          stroke="#3A8A40"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <line x1="46" y1="70" x2="46" y2="74" stroke="#fff" strokeWidth="2" />
        <line x1="50" y1="72" x2="50" y2="76" stroke="#fff" strokeWidth="2" />
        <line x1="54" y1="70" x2="54" y2="74" stroke="#fff" strokeWidth="2" />
        <ellipse cx="30" cy="57" rx="5" ry="3" fill="#FF9E7D" opacity="0.45" />
        <ellipse cx="70" cy="57" rx="5" ry="3" fill="#FF9E7D" opacity="0.45" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#5DBD6A"
          strokeWidth="2"
        />
      </symbol>

      {/* 6. Wizard Bear */}
      <symbol id="avatar-bear" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#EDE7F6" />
        <ellipse cx="50" cy="88" rx="28" ry="16" fill="#8B5E3C" />
        <rect x="28" y="78" width="44" height="14" rx="4" fill="#6A3FA8" />
        <text x="36" y="90" fontSize="8" fill="#FFD700" fontFamily="sans-serif">
          ★
        </text>
        <text x="50" y="90" fontSize="6" fill="#FFD700" fontFamily="sans-serif">
          ★
        </text>
        <circle cx="50" cy="52" r="25" fill="#C68C5A" />
        <polygon points="50,12 30,44 70,44" fill="#6A3FA8" />
        <rect x="27" y="42" width="46" height="7" rx="3" fill="#7C4AB5" />
        <text
          x="44"
          y="36"
          fontSize="12"
          fill="#FFD700"
          fontFamily="sans-serif"
        >
          ★
        </text>
        <circle cx="30" cy="48" r="7" fill="#C68C5A" />
        <circle cx="70" cy="48" r="7" fill="#C68C5A" />
        <circle cx="40" cy="51" r="5" fill="#fff" />
        <circle cx="60" cy="51" r="5" fill="#fff" />
        <circle cx="41" cy="51" r="3" fill="#3C2A1E" />
        <circle cx="61" cy="51" r="3" fill="#3C2A1E" />
        <path
          d="M36 44 Q40 41 44 44"
          stroke="#5A3010"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M56 44 Q60 41 64 44"
          stroke="#5A3010"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="50" cy="58" rx="3" ry="2.5" fill="#A06030" />
        <path
          d="M43 64 Q50 71 57 64"
          stroke="#8B4A20"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <line
          x1="68"
          y1="58"
          x2="82"
          y2="38"
          stroke="#5A3010"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="82" cy="36" r="4" fill="#FFD700" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#6A3FA8"
          strokeWidth="2"
        />
      </symbol>

      {/* 7. Robo Buddy */}
      <symbol id="avatar-robot" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#E8F4F8" />
        <rect x="28" y="76" width="44" height="20" rx="6" fill="#7EC8DA" />
        <circle cx="50" cy="86" r="5" fill="#FFE066" />
        <rect x="44" y="68" width="12" height="10" rx="3" fill="#5ABCD0" />
        <rect x="24" y="30" width="52" height="42" rx="10" fill="#A8D8E8" />
        <line
          x1="50"
          y1="30"
          x2="50"
          y2="16"
          stroke="#5ABCD0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="13" r="5" fill="#FF6B6B" />
        <rect x="29" y="40" width="17" height="13" rx="4" fill="#1A1A2E" />
        <rect x="54" y="40" width="17" height="13" rx="4" fill="#1A1A2E" />
        <rect
          x="31"
          y="42"
          width="13"
          height="9"
          rx="3"
          fill="#7DF9C6"
          opacity="0.9"
        />
        <rect
          x="56"
          y="42"
          width="13"
          height="9"
          rx="3"
          fill="#7DF9C6"
          opacity="0.9"
        />
        <line
          x1="33"
          y1="46"
          x2="42"
          y2="46"
          stroke="#fff"
          strokeWidth="1"
          opacity="0.6"
        />
        <line
          x1="58"
          y1="46"
          x2="67"
          y2="46"
          stroke="#fff"
          strokeWidth="1"
          opacity="0.6"
        />
        <rect x="34" y="59" width="32" height="9" rx="3" fill="#1A1A2E" />
        <rect x="36" y="61" width="6" height="5" rx="1" fill="#7DF9C6" />
        <rect x="46" y="61" width="6" height="5" rx="1" fill="#7DF9C6" />
        <rect x="56" y="61" width="6" height="5" rx="1" fill="#7DF9C6" />
        <circle cx="24" cy="47" r="4" fill="#5ABCD0" />
        <circle cx="76" cy="47" r="4" fill="#5ABCD0" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#5ABCD0"
          strokeWidth="2"
        />
      </symbol>

      {/* 8. Shroom */}
      <symbol id="avatar-shroom" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#FFF0F5" />
        <ellipse cx="50" cy="82" rx="20" ry="15" fill="#FFEAC8" />
        <ellipse cx="50" cy="46" rx="34" ry="26" fill="#E8645A" />
        <circle cx="34" cy="36" r="6" fill="#fff" opacity="0.85" />
        <circle cx="54" cy="28" r="5" fill="#fff" opacity="0.85" />
        <circle cx="68" cy="42" r="4" fill="#fff" opacity="0.85" />
        <circle cx="38" cy="49" r="3.5" fill="#fff" opacity="0.75" />
        <ellipse cx="50" cy="58" rx="20" ry="8" fill="#FFEAC8" />
        <circle cx="42" cy="73" r="5" fill="#fff" />
        <circle cx="58" cy="73" r="5" fill="#fff" />
        <circle cx="43" cy="73" r="3" fill="#3C2A1E" />
        <circle cx="59" cy="73" r="3" fill="#3C2A1E" />
        <circle cx="44" cy="72" r="1" fill="#fff" />
        <circle cx="60" cy="72" r="1" fill="#fff" />
        <ellipse cx="34" cy="79" rx="5" ry="3" fill="#FF9E7D" opacity="0.5" />
        <ellipse cx="66" cy="79" rx="5" ry="3" fill="#FF9E7D" opacity="0.5" />
        <path
          d="M42 80 Q50 87 58 80"
          stroke="#C0503A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="36" cy="90" rx="8" ry="5" fill="#F0C898" />
        <ellipse cx="64" cy="90" rx="8" ry="5" fill="#F0C898" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#E8645A"
          strokeWidth="2"
        />
      </symbol>

      {/* 9. Ocean Fish */}
      <symbol id="avatar-fish" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D6F1FF" />
        <ellipse cx="50" cy="88" rx="40" ry="8" fill="#A8DCEF" opacity="0.5" />
        <polygon points="78,44 96,32 96,58" fill="#FF8C42" />
        <ellipse cx="50" cy="46" rx="32" ry="22" fill="#FF8C42" />
        <ellipse cx="44" cy="52" rx="18" ry="10" fill="#FFEAC8" opacity="0.7" />
        <polygon points="38,28 50,12 62,28" fill="#E8645A" />
        <circle cx="32" cy="42" r="8" fill="#fff" />
        <circle cx="33" cy="42" r="5" fill="#1A3A6E" />
        <circle cx="34" cy="40" r="2" fill="#fff" />
        <path
          d="M22 48 Q26 54 30 48"
          stroke="#C0503A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="16" cy="32" r="3" fill="#fff" opacity="0.7" />
        <circle cx="10" cy="22" r="2" fill="#fff" opacity="0.5" />
        <circle cx="20" cy="18" r="1.5" fill="#fff" opacity="0.6" />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#FF8C42"
          strokeWidth="2"
        />
      </symbol>

      {/* 10. Star Owl */}
      <symbol id="avatar-owl" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#1A1A2E" />
        <circle cx="12" cy="14" r="1" fill="#FFD700" opacity="0.8" />
        <circle cx="88" cy="20" r="1.2" fill="#FFD700" opacity="0.6" />
        <circle cx="10" cy="78" r="1" fill="#FFD700" opacity="0.7" />
        <circle cx="90" cy="86" r="1.5" fill="#FFD700" opacity="0.5" />
        <circle cx="50" cy="8" r="1" fill="#FFD700" opacity="0.6" />
        <ellipse cx="50" cy="86" rx="28" ry="16" fill="#534AB7" />
        <ellipse
          cx="28"
          cy="72"
          rx="13"
          ry="20"
          fill="#3C3489"
          transform="rotate(-15,28,72)"
        />
        <ellipse
          cx="72"
          cy="72"
          rx="13"
          ry="20"
          fill="#3C3489"
          transform="rotate(15,72,72)"
        />
        <circle cx="50" cy="48" r="28" fill="#534AB7" />
        <polygon points="38,26 32,8 44,24" fill="#534AB7" />
        <polygon points="62,26 68,8 56,24" fill="#534AB7" />
        <ellipse cx="50" cy="50" rx="20" ry="18" fill="#7F77DD" opacity="0.5" />
        <circle cx="38" cy="47" r="10" fill="#fff" />
        <circle cx="62" cy="47" r="10" fill="#fff" />
        <circle cx="38" cy="48" r="7" fill="#FFD700" />
        <circle cx="62" cy="48" r="7" fill="#FFD700" />
        <circle cx="38" cy="48" r="4" fill="#1A1A2E" />
        <circle cx="62" cy="48" r="4" fill="#1A1A2E" />
        <circle cx="39" cy="47" r="1.4" fill="#fff" />
        <circle cx="63" cy="47" r="1.4" fill="#fff" />
        <polygon points="50,57 44,66 56,66" fill="#FFD700" />
        <text
          x="44"
          y="80"
          fontSize="14"
          fill="#FFD700"
          fontFamily="sans-serif"
        >
          ★
        </text>
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#534AB7"
          strokeWidth="2"
        />
      </symbol>
    </svg>
  );
}
