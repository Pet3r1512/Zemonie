export default function AvatarSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      {/* 1. Sunny Fox */}
      <symbol id="avatar-fox" viewBox="0 0 100 100">
        {/* bg */}
        <circle cx="50" cy="50" r="50" fill="#FFD05B" />
        {/* bottom shadow band */}
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#C07010"
          opacity="0.35"
        />
        {/* body */}
        <ellipse cx="50" cy="88" rx="33" ry="22" fill="#E8920A" />
        <ellipse cx="40" cy="78" rx="14" ry="7" fill="#FFBA40" opacity="0.45" />
        {/* head shadow base */}
        <circle cx="51" cy="51" r="29" fill="#D07808" />
        {/* head */}
        <circle cx="50" cy="50" r="29" fill="#F4A43C" />
        {/* head highlight */}
        <ellipse cx="43" cy="34" rx="13" ry="8" fill="#FFCF70" opacity="0.55" />
        {/* ears — layered for depth */}
        <polygon points="28,35 20,14 38,32" fill="#D07808" />
        <polygon points="29,34 22,16 37,31" fill="#F4A43C" />
        <polygon points="30,32 24,20 36,30" fill="#FFAD96" />
        <polygon points="72,35 80,14 62,32" fill="#D07808" />
        <polygon points="71,34 78,16 63,31" fill="#F4A43C" />
        <polygon points="70,32 76,20 64,30" fill="#FFAD96" />
        {/* muzzle */}
        <ellipse cx="50" cy="60" rx="14" ry="10" fill="#C07808" opacity="0.2" />
        <ellipse cx="50" cy="59" rx="13" ry="9" fill="#FFEAC8" />
        <ellipse cx="46" cy="55" rx="5" ry="3" fill="#fff" opacity="0.4" />
        {/* eyes — shadow base + white */}
        <circle cx="38" cy="45" r="6.5" fill="#D07808" opacity="0.3" />
        <circle cx="38" cy="44" r="6" fill="#fff" />
        <circle cx="62" cy="45" r="6.5" fill="#D07808" opacity="0.3" />
        <circle cx="62" cy="44" r="6" fill="#fff" />
        {/* iris */}
        <circle cx="39" cy="44" r="3.8" fill="#4A2800" />
        <circle cx="63" cy="44" r="3.8" fill="#4A2800" />
        {/* primary shine */}
        <circle cx="40" cy="42" r="1.4" fill="#fff" />
        <circle cx="64" cy="42" r="1.4" fill="#fff" />
        {/* secondary glint */}
        <circle cx="42" cy="46" r="0.7" fill="#fff" opacity="0.6" />
        <circle cx="66" cy="46" r="0.7" fill="#fff" opacity="0.6" />
        {/* nose */}
        <ellipse cx="50" cy="56" rx="3.5" ry="2.5" fill="#C0402A" />
        <ellipse
          cx="49"
          cy="55"
          rx="1.2"
          ry="0.8"
          fill="#E86050"
          opacity="0.7"
        />
        {/* smile */}
        <path
          d="M42 62 Q50 69 58 62"
          stroke="#9A3010"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* cheek blush */}
        <ellipse
          cx="26"
          cy="54"
          rx="7"
          ry="4.5"
          fill="#FF8855"
          opacity="0.35"
        />
        <ellipse
          cx="74"
          cy="54"
          rx="7"
          ry="4.5"
          fill="#FF8855"
          opacity="0.35"
        />
        {/* rim shadow */}
        <ellipse
          cx="50"
          cy="90"
          rx="42"
          ry="10"
          fill="#A05800"
          opacity="0.22"
        />
        {/* border — dark inner + coloured outer */}
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#A06000"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#FFD070"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 2. Cool Cat */}
      <symbol id="avatar-cat" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#B3D9F7" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#4A90C0"
          opacity="0.28"
        />
        {/* body + sweater */}
        <ellipse cx="50" cy="88" rx="33" ry="20" fill="#5A9EC8" />
        <rect x="17" y="80" width="66" height="8" rx="3" fill="#3A7EB0" />
        <ellipse cx="36" cy="82" rx="10" ry="4" fill="#6AAED6" opacity="0.4" />
        {/* head shadow */}
        <circle cx="51" cy="47" r="29" fill="#9ABDD8" />
        {/* head */}
        <circle cx="50" cy="46" r="29" fill="#FFEAC8" />
        <ellipse cx="42" cy="30" rx="13" ry="8" fill="#fff" opacity="0.45" />
        {/* ears */}
        <polygon points="28,32 22,10 40,28" fill="#D8B898" />
        <polygon points="29,30 24,14 39,27" fill="#FFEAC8" />
        <polygon points="30,28 26,18 38,26" fill="#FFB3D9" />
        <polygon points="72,32 78,10 60,28" fill="#D8B898" />
        <polygon points="71,30 76,14 61,27" fill="#FFEAC8" />
        <polygon points="70,28 74,18 62,26" fill="#FFB3D9" />
        {/* muzzle */}
        <ellipse cx="50" cy="54" rx="12" ry="8" fill="#FFF5E8" />
        <ellipse cx="46" cy="50" rx="5" ry="3" fill="#fff" opacity="0.4" />
        {/* sunglasses frames */}
        <rect x="31" y="37" width="16" height="11" rx="5" fill="#1A1A1A" />
        <rect x="53" y="37" width="16" height="11" rx="5" fill="#1A1A1A" />
        <line
          x1="47"
          y1="42"
          x2="53"
          y2="42"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
        {/* lens tint */}
        <rect
          x="32"
          y="38"
          width="14"
          height="9"
          rx="4"
          fill="#2255AA"
          opacity="0.45"
        />
        <rect
          x="54"
          y="38"
          width="14"
          height="9"
          rx="4"
          fill="#2255AA"
          opacity="0.45"
        />
        {/* lens shine */}
        <ellipse cx="37" cy="40" rx="3" ry="1.5" fill="#fff" opacity="0.35" />
        <ellipse cx="59" cy="40" rx="3" ry="1.5" fill="#fff" opacity="0.35" />
        {/* nose */}
        <ellipse cx="50" cy="52" rx="3" ry="2" fill="#C0402A" />
        <ellipse
          cx="49"
          cy="51"
          rx="1.1"
          ry="0.7"
          fill="#E07060"
          opacity="0.7"
        />
        {/* whiskers */}
        <line
          x1="32"
          y1="54"
          x2="47"
          y2="55"
          stroke="#B0A090"
          strokeWidth="0.9"
        />
        <line
          x1="32"
          y1="57"
          x2="47"
          y2="57"
          stroke="#B0A090"
          strokeWidth="0.9"
        />
        <line
          x1="68"
          y1="54"
          x2="53"
          y2="55"
          stroke="#B0A090"
          strokeWidth="0.9"
        />
        <line
          x1="68"
          y1="57"
          x2="53"
          y2="57"
          stroke="#B0A090"
          strokeWidth="0.9"
        />
        {/* smirk */}
        <path
          d="M44 59 Q50 65 57 61"
          stroke="#9A3010"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="50" cy="90" rx="42" ry="10" fill="#2A70A0" opacity="0.2" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#3A80B0"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#7ACFF0"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 3. Happy Panda */}
      <symbol id="avatar-panda" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D9F5D6" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#60A860"
          opacity="0.25"
        />
        {/* body */}
        <ellipse cx="50" cy="88" rx="32" ry="20" fill="#E8E8E8" />
        <ellipse cx="38" cy="78" rx="12" ry="6" fill="#fff" opacity="0.5" />
        {/* black ears with highlight */}
        <circle cx="24" cy="28" r="13" fill="#1A1A18" />
        <circle cx="76" cy="28" r="13" fill="#1A1A18" />
        <ellipse cx="20" cy="24" rx="5" ry="3.5" fill="#484846" opacity="0.6" />
        <ellipse cx="72" cy="24" rx="5" ry="3.5" fill="#484846" opacity="0.6" />
        {/* head shadow + head */}
        <circle cx="51" cy="49" r="29" fill="#CCCCCC" />
        <circle cx="50" cy="48" r="29" fill="#F8F8F8" />
        <ellipse cx="41" cy="32" rx="13" ry="8" fill="#fff" opacity="0.6" />
        {/* eye patches with highlight */}
        <ellipse cx="37" cy="44" rx="11" ry="10" fill="#1A1A18" />
        <ellipse cx="63" cy="44" rx="11" ry="10" fill="#1A1A18" />
        <ellipse cx="33" cy="39" rx="4" ry="2.5" fill="#484846" opacity="0.5" />
        <ellipse cx="59" cy="39" rx="4" ry="2.5" fill="#484846" opacity="0.5" />
        {/* eyes */}
        <circle cx="37" cy="45" r="7" fill="#fff" />
        <circle cx="63" cy="45" r="7" fill="#fff" />
        <circle cx="38" cy="45" r="4.5" fill="#1A1A18" />
        <circle cx="64" cy="45" r="4.5" fill="#1A1A18" />
        <circle cx="39" cy="43" r="1.8" fill="#fff" />
        <circle cx="65" cy="43" r="1.8" fill="#fff" />
        <circle cx="42" cy="47" r="0.8" fill="#fff" opacity="0.6" />
        <circle cx="68" cy="47" r="0.8" fill="#fff" opacity="0.6" />
        {/* muzzle */}
        <ellipse cx="50" cy="57" rx="13" ry="9" fill="#E8E4DE" />
        <ellipse cx="46" cy="52" rx="5" ry="3" fill="#fff" opacity="0.45" />
        {/* nose */}
        <ellipse cx="50" cy="53" rx="4.5" ry="3.5" fill="#1A1A18" />
        <ellipse cx="49" cy="52" rx="1.5" ry="1" fill="#484846" opacity="0.7" />
        {/* smile */}
        <path
          d="M41 60 Q50 69 59 60"
          stroke="#1A1A18"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* bamboo */}
        <rect x="68" y="68" width="6" height="30" fill="#5AAA5A" rx="2.5" />
        <rect x="66" y="78" width="10" height="3.5" fill="#449944" rx="1.5" />
        <rect x="66" y="88" width="10" height="3.5" fill="#449944" rx="1.5" />
        <rect
          x="69"
          y="68"
          width="2"
          height="30"
          fill="#88CC88"
          opacity="0.4"
          rx="1"
        />
        <ellipse
          cx="50"
          cy="92"
          rx="42"
          ry="10"
          fill="#308830"
          opacity="0.18"
        />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#448844"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#88DD88"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 4. Space Bunny */}
      <symbol id="avatar-bunny" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#0E0E22" />
        {/* stars */}
        <circle cx="18" cy="18" r="1.2" fill="#fff" opacity="0.9" />
        <circle cx="82" cy="14" r="0.9" fill="#fff" opacity="0.7" />
        <circle cx="12" cy="68" r="1.4" fill="#fff" opacity="0.8" />
        <circle cx="86" cy="78" r="0.8" fill="#fff" opacity="0.5" />
        <circle cx="30" cy="10" r="1" fill="#fff" opacity="0.65" />
        <circle cx="72" cy="88" r="0.9" fill="#fff" opacity="0.6" />
        {/* suit body */}
        <ellipse cx="50" cy="88" rx="30" ry="20" fill="#6A75CC" />
        <ellipse cx="39" cy="78" rx="11" ry="6" fill="#8A95E0" opacity="0.45" />
        {/* helmet outer glow ring */}
        <circle cx="50" cy="46" r="34" fill="#9AA8D8" opacity="0.25" />
        {/* helmet glass */}
        <circle cx="50" cy="46" r="32" fill="#C8D4F0" />
        <circle cx="50" cy="46" r="30" fill="#D8E4FF" opacity="0.6" />
        {/* ears inside helmet */}
        <ellipse cx="37" cy="22" rx="6" ry="14" fill="#CC88AA" />
        <ellipse cx="37" cy="22" rx="3.5" ry="10" fill="#EEB0CC" />
        <ellipse cx="35" cy="16" rx="2" ry="5" fill="#FFD0E0" opacity="0.6" />
        <ellipse cx="63" cy="22" rx="6" ry="14" fill="#CC88AA" />
        <ellipse cx="63" cy="22" rx="3.5" ry="10" fill="#EEB0CC" />
        <ellipse cx="61" cy="16" rx="2" ry="5" fill="#FFD0E0" opacity="0.6" />
        {/* face */}
        <circle cx="51" cy="48" r="22" fill="#FFDDB8" />
        <ellipse cx="44" cy="36" rx="10" ry="6" fill="#FFE8CC" opacity="0.6" />
        {/* eyes */}
        <circle cx="42" cy="44" r="6.5" fill="#E8C8A0" opacity="0.4" />
        <circle cx="42" cy="43" r="6" fill="#fff" />
        <circle cx="58" cy="44" r="6.5" fill="#E8C8A0" opacity="0.4" />
        <circle cx="58" cy="43" r="6" fill="#fff" />
        <circle cx="43" cy="43" r="4" fill="#6030A0" />
        <circle cx="59" cy="43" r="4" fill="#6030A0" />
        <circle cx="44" cy="41" r="1.6" fill="#fff" />
        <circle cx="60" cy="41" r="1.6" fill="#fff" />
        <circle cx="47" cy="46" r="0.7" fill="#fff" opacity="0.6" />
        <circle cx="63" cy="46" r="0.7" fill="#fff" opacity="0.6" />
        {/* nose */}
        <ellipse cx="50" cy="51" rx="3" ry="2" fill="#D04030" />
        <ellipse cx="49" cy="50" rx="1" ry="0.7" fill="#E87060" opacity="0.7" />
        {/* smile */}
        <path
          d="M44 56 Q50 62 56 56"
          stroke="#B03020"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* helmet rim */}
        <circle
          cx="50"
          cy="46"
          r="32"
          fill="none"
          stroke="#B0BCEA"
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="46"
          r="32"
          fill="none"
          stroke="#E8EEFF"
          strokeWidth="1.5"
        />
        {/* helmet top highlight */}
        <ellipse cx="38" cy="26" rx="12" ry="7" fill="#fff" opacity="0.22" />
        <ellipse cx="50" cy="90" rx="42" ry="10" fill="#0A0A30" opacity="0.4" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#4050A0"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#8090D8"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 5. Dino Pal */}
      <symbol id="avatar-dino" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D4F5D4" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#228830"
          opacity="0.28"
        />
        {/* body */}
        <ellipse cx="50" cy="88" rx="32" ry="20" fill="#449944" />
        <ellipse cx="38" cy="77" rx="12" ry="6" fill="#66BB66" opacity="0.4" />
        {/* spike shadows */}
        <polygon points="32,31 28,12 37,29" fill="#228830" opacity="0.5" />
        <polygon points="43,26 41,7 49,24" fill="#228830" opacity="0.5" />
        <polygon points="55,26 55,7 61,24" fill="#228830" opacity="0.5" />
        <polygon points="66,31 69,12 72,29" fill="#228830" opacity="0.5" />
        {/* spikes */}
        <polygon points="31,30 27,10 38,28" fill="#D8622A" />
        <polygon points="42,25 40,6 50,23" fill="#D8622A" />
        <polygon points="54,25 54,6 61,23" fill="#D8622A" />
        <polygon points="65,30 68,10 72,28" fill="#D8622A" />
        {/* spike highlights */}
        <polygon points="31,30 29,18 34,29" fill="#EE9060" opacity="0.5" />
        <polygon points="42,25 41,15 45,24" fill="#EE9060" opacity="0.5" />
        {/* head shadow + head */}
        <ellipse cx="51" cy="51" rx="30" ry="25" fill="#2A8030" />
        <ellipse cx="50" cy="50" rx="30" ry="25" fill="#4AAA55" />
        <ellipse cx="39" cy="34" rx="13" ry="8" fill="#80CC80" opacity="0.45" />
        {/* snout */}
        <ellipse cx="51" cy="64" rx="16" ry="11" fill="#2A8030" />
        <ellipse cx="50" cy="63" rx="15" ry="11" fill="#389940" />
        <ellipse cx="43" cy="58" rx="6" ry="3.5" fill="#66BB66" opacity="0.4" />
        {/* eyes */}
        <circle cx="36" cy="44" r="7.5" fill="#1A5020" opacity="0.4" />
        <circle cx="36" cy="43" r="7" fill="#fff" />
        <circle cx="64" cy="44" r="7.5" fill="#1A5020" opacity="0.4" />
        <circle cx="64" cy="43" r="7" fill="#fff" />
        <circle cx="37" cy="43" r="4.5" fill="#1A3018" />
        <circle cx="65" cy="43" r="4.5" fill="#1A3018" />
        <circle cx="38" cy="41" r="1.8" fill="#fff" />
        <circle cx="66" cy="41" r="1.8" fill="#fff" />
        <circle cx="41" cy="46" r="0.8" fill="#fff" opacity="0.6" />
        <circle cx="69" cy="46" r="0.8" fill="#fff" opacity="0.6" />
        {/* nostrils */}
        <ellipse cx="43" cy="60" rx="2.2" ry="1.6" fill="#228830" />
        <ellipse cx="57" cy="60" rx="2.2" ry="1.6" fill="#228830" />
        {/* big grin */}
        <path
          d="M36 67 Q50 80 64 67"
          stroke="#1A5020"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <line
          x1="44"
          y1="72"
          x2="44"
          y2="78"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="75"
          x2="50"
          y2="81"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="56"
          y1="72"
          x2="56"
          y2="78"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* cheeks */}
        <ellipse cx="24" cy="55" rx="6" ry="4" fill="#FF9E7D" opacity="0.4" />
        <ellipse cx="76" cy="55" rx="6" ry="4" fill="#FF9E7D" opacity="0.4" />
        <ellipse cx="50" cy="92" rx="42" ry="10" fill="#1A6020" opacity="0.2" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#2A7030"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#88DD88"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 6. Wizard Bear */}
      <symbol id="avatar-bear" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#EDE7F6" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#5030A0"
          opacity="0.25"
        />
        {/* robe body */}
        <ellipse cx="50" cy="88" rx="32" ry="20" fill="#7040B0" />
        <ellipse cx="38" cy="78" rx="12" ry="6" fill="#9060D0" opacity="0.4" />
        <text x="34" y="92" fontSize="9" fill="#FFD700" fontFamily="sans-serif">
          ★
        </text>
        <text x="50" y="88" fontSize="7" fill="#FFD700" fontFamily="sans-serif">
          ★
        </text>
        {/* hat shadow + hat */}
        <polygon points="50,6 26,44 74,44" fill="#4020A0" opacity="0.5" />
        <polygon points="50,4 26,42 74,42" fill="#7040B0" />
        <polygon points="50,4 50,42 74,42" fill="#9060D0" opacity="0.3" />
        {/* hat brim */}
        <rect
          x="23"
          y="40"
          width="54"
          height="8"
          rx="3.5"
          fill="#3A2090"
          opacity="0.5"
        />
        <rect x="23" y="38" width="54" height="8" rx="3.5" fill="#8050C0" />
        <rect
          x="24"
          y="39"
          width="26"
          height="3"
          rx="1.5"
          fill="#A070E0"
          opacity="0.4"
        />
        {/* star on hat */}
        <text
          x="44"
          y="24"
          fontSize="13"
          fill="#FFD700"
          fontFamily="sans-serif"
        >
          ★
        </text>
        <text
          x="44"
          y="24"
          fontSize="13"
          fill="#fff"
          opacity="0.2"
          fontFamily="sans-serif"
        >
          ★
        </text>
        {/* ears */}
        <circle cx="26" cy="50" r="9" fill="#9A6030" opacity="0.9" />
        <circle cx="26" cy="49" r="8" fill="#C07840" />
        <circle cx="23" cy="46" r="3.5" fill="#D09060" opacity="0.5" />
        <circle cx="74" cy="50" r="9" fill="#9A6030" opacity="0.9" />
        <circle cx="74" cy="49" r="8" fill="#C07840" />
        <circle cx="71" cy="46" r="3.5" fill="#D09060" opacity="0.5" />
        {/* head shadow + head */}
        <circle cx="51" cy="63" r="27" fill="#9A6030" />
        <circle cx="50" cy="62" r="27" fill="#C68C5A" />
        <ellipse
          cx="42"
          cy="46"
          rx="12"
          ry="7.5"
          fill="#E0AA70"
          opacity="0.5"
        />
        {/* eyes */}
        <circle cx="39" cy="59" r="6" fill="#7A4010" opacity="0.35" />
        <circle cx="39" cy="58" r="5.5" fill="#fff" />
        <circle cx="61" cy="59" r="6" fill="#7A4010" opacity="0.35" />
        <circle cx="61" cy="58" r="5.5" fill="#fff" />
        <circle cx="40" cy="58" r="3.5" fill="#2A1808" />
        <circle cx="62" cy="58" r="3.5" fill="#2A1808" />
        <circle cx="41" cy="56" r="1.4" fill="#fff" />
        <circle cx="63" cy="56" r="1.4" fill="#fff" />
        {/* bushy eyebrows */}
        <path
          d="M33 51 Q39 47 45 51"
          stroke="#5A2808"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M55 51 Q61 47 67 51"
          stroke="#5A2808"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* muzzle */}
        <ellipse cx="50" cy="70" rx="13" ry="9" fill="#B87848" />
        <ellipse cx="45" cy="65" rx="5" ry="3" fill="#D09060" opacity="0.4" />
        {/* nose */}
        <ellipse cx="50" cy="66" rx="3.5" ry="2.8" fill="#7A4010" />
        <ellipse
          cx="49"
          cy="65"
          rx="1.2"
          ry="0.8"
          fill="#AA6030"
          opacity="0.7"
        />
        {/* smile */}
        <path
          d="M42 74 Q50 82 58 74"
          stroke="#6A3010"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
        />
        {/* wand */}
        <line
          x1="70"
          y1="66"
          x2="88"
          y2="42"
          stroke="#4A2808"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="88" cy="40" r="6" fill="#E0A000" opacity="0.3" />
        <circle cx="88" cy="40" r="5" fill="#FFD700" />
        <circle cx="86" cy="38" r="2" fill="#FFE880" opacity="0.7" />
        <ellipse cx="50" cy="92" rx="42" ry="10" fill="#3A1880" opacity="0.2" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#5030A0"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#A080E0"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 7. Robo Buddy */}
      <symbol id="avatar-robot" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#E8F4F8" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#3090A8"
          opacity="0.25"
        />
        {/* body */}
        <rect x="22" y="74" width="56" height="28" rx="8" fill="#6ABCD0" />
        <rect
          x="24"
          y="76"
          width="26"
          height="10"
          rx="4"
          fill="#90D4E8"
          opacity="0.45"
        />
        {/* chest light */}
        <circle cx="50" cy="88" r="6.5" fill="#D0A000" opacity="0.4" />
        <circle cx="50" cy="88" r="5.5" fill="#FFE044" />
        <circle cx="48" cy="86" r="2" fill="#FFE880" opacity="0.7" />
        {/* neck */}
        <rect x="44" y="64" width="12" height="12" rx="3" fill="#4AAAC0" />
        {/* head shadow + head */}
        <rect x="18" y="22" width="64" height="44" rx="12" fill="#3AAAC0" />
        <rect x="18" y="20" width="64" height="44" rx="12" fill="#88C8DC" />
        <rect
          x="22"
          y="24"
          width="30"
          height="16"
          rx="6"
          fill="#B0E0EE"
          opacity="0.45"
        />
        {/* antenna */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="4"
          stroke="#4AAAC0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="50" cy="2" r="7" fill="#D04040" opacity="0.3" />
        <circle cx="50" cy="2" r="6" fill="#FF6060" />
        <circle cx="48" cy="0" r="2.5" fill="#FF9090" opacity="0.7" />
        {/* eye panels */}
        <rect
          x="24"
          y="33"
          width="20"
          height="15"
          rx="5"
          fill="#0A1828"
          opacity="0.8"
        />
        <rect
          x="56"
          y="33"
          width="20"
          height="15"
          rx="5"
          fill="#0A1828"
          opacity="0.8"
        />
        <rect x="24" y="32" width="20" height="15" rx="5" fill="#12202A" />
        <rect x="56" y="32" width="20" height="15" rx="5" fill="#12202A" />
        {/* eye glow */}
        <rect
          x="26"
          y="34"
          width="16"
          height="11"
          rx="4"
          fill="#50F0C0"
          opacity="0.95"
        />
        <rect
          x="58"
          y="34"
          width="16"
          height="11"
          rx="4"
          fill="#50F0C0"
          opacity="0.95"
        />
        {/* scan line */}
        <line
          x1="28"
          y1="39"
          x2="40"
          y2="39"
          stroke="#fff"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <line
          x1="60"
          y1="39"
          x2="72"
          y2="39"
          stroke="#fff"
          strokeWidth="1.2"
          opacity="0.5"
        />
        {/* eye highlight */}
        <ellipse cx="31" cy="36" rx="3.5" ry="2" fill="#fff" opacity="0.3" />
        <ellipse cx="63" cy="36" rx="3.5" ry="2" fill="#fff" opacity="0.3" />
        {/* mouth panel */}
        <rect x="30" y="53" width="40" height="11" rx="4" fill="#12202A" />
        <rect
          x="33"
          y="55"
          width="7"
          height="7"
          rx="2"
          fill="#50F0C0"
          opacity="0.9"
        />
        <rect
          x="44"
          y="55"
          width="7"
          height="7"
          rx="2"
          fill="#50F0C0"
          opacity="0.9"
        />
        <rect
          x="55"
          y="55"
          width="7"
          height="7"
          rx="2"
          fill="#50F0C0"
          opacity="0.9"
        />
        {/* ear bolts */}
        <circle cx="18" cy="40" r="6" fill="#3090A8" opacity="0.5" />
        <circle cx="18" cy="39" r="5.5" fill="#4AAAC0" />
        <circle cx="16" cy="37" r="2" fill="#7ACCE0" opacity="0.5" />
        <circle cx="82" cy="40" r="6" fill="#3090A8" opacity="0.5" />
        <circle cx="82" cy="39" r="5.5" fill="#4AAAC0" />
        <circle cx="80" cy="37" r="2" fill="#7ACCE0" opacity="0.5" />
        <ellipse cx="50" cy="92" rx="42" ry="10" fill="#2080A0" opacity="0.2" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#3090A8"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#80D8F0"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 8. Shroom */}
      <symbol id="avatar-shroom" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#FFF0F5" />
        <ellipse cx="50" cy="92" rx="46" ry="12" fill="#C03040" opacity="0.2" />
        {/* feet */}
        <ellipse cx="36" cy="94" rx="10" ry="6" fill="#DDAA80" />
        <ellipse cx="64" cy="94" rx="10" ry="6" fill="#DDAA80" />
        <ellipse cx="33" cy="91" rx="4" ry="2.5" fill="#EEC098" opacity="0.5" />
        <ellipse cx="61" cy="91" rx="4" ry="2.5" fill="#EEC098" opacity="0.5" />
        {/* stem shadow + stem */}
        <ellipse cx="51" cy="76" rx="23" ry="19" fill="#D8B888" />
        <ellipse cx="50" cy="75" rx="22" ry="18" fill="#FFEAC8" />
        <ellipse cx="43" cy="65" rx="9" ry="6" fill="#fff" opacity="0.45" />
        {/* cap shadow + cap */}
        <ellipse cx="51" cy="47" rx="36" ry="28" fill="#B02030" />
        <ellipse cx="50" cy="46" rx="36" ry="28" fill="#E8403A" />
        <ellipse
          cx="34"
          cy="30"
          rx="16"
          ry="10"
          fill="#F07068"
          opacity="0.55"
        />
        <ellipse cx="28" cy="26" rx="7" ry="4.5" fill="#fff" opacity="0.3" />
        {/* spots with shadow */}
        <circle cx="34" cy="33" r="7.5" fill="#B02030" opacity="0.3" />
        <circle cx="34" cy="32" r="7" fill="#fff" opacity="0.92" />
        <ellipse cx="31" cy="29" rx="3" ry="2" fill="#fff" />
        <circle cx="56" cy="23" r="6.5" fill="#B02030" opacity="0.3" />
        <circle cx="56" cy="22" r="6" fill="#fff" opacity="0.92" />
        <ellipse cx="53" cy="19" rx="2.5" ry="1.5" fill="#fff" />
        <circle cx="70" cy="36" r="5.5" fill="#B02030" opacity="0.3" />
        <circle cx="70" cy="35" r="5" fill="#fff" opacity="0.92" />
        <circle cx="38" cy="43" r="4.5" fill="#B02030" opacity="0.25" />
        <circle cx="38" cy="42" r="4" fill="#fff" opacity="0.85" />
        {/* cap underside */}
        <ellipse cx="50" cy="61" rx="24" ry="9" fill="#FFEAC8" opacity="0.9" />
        <ellipse cx="44" cy="58" rx="9" ry="4" fill="#fff" opacity="0.3" />
        {/* face eyes */}
        <circle cx="41" cy="74" r="6" fill="#D8A870" opacity="0.3" />
        <circle cx="41" cy="73" r="5.5" fill="#fff" />
        <circle cx="59" cy="74" r="6" fill="#D8A870" opacity="0.3" />
        <circle cx="59" cy="73" r="5.5" fill="#fff" />
        <circle cx="42" cy="73" r="3.5" fill="#2C1A0A" />
        <circle cx="60" cy="73" r="3.5" fill="#2C1A0A" />
        <circle cx="43" cy="71" r="1.4" fill="#fff" />
        <circle cx="61" cy="71" r="1.4" fill="#fff" />
        {/* cheeks */}
        <ellipse cx="29" cy="78" rx="6" ry="4" fill="#FF9090" opacity="0.4" />
        <ellipse cx="71" cy="78" rx="6" ry="4" fill="#FF9090" opacity="0.4" />
        {/* smile */}
        <path
          d="M41 80 Q50 89 59 80"
          stroke="#9A3010"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#B02030"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#F07070"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 9. Ocean Fish */}
      <symbol id="avatar-fish" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#D6F1FF" />
        <ellipse
          cx="50"
          cy="92"
          rx="46"
          ry="12"
          fill="#2068A0"
          opacity="0.25"
        />
        {/* water caustic */}
        <ellipse cx="30" cy="86" rx="30" ry="7" fill="#A8D8EF" opacity="0.5" />
        <ellipse cx="68" cy="90" rx="20" ry="5" fill="#A8D8EF" opacity="0.35" />
        {/* tail fin shadow + tail */}
        <polygon points="76,44 96,28 96,62" fill="#CC5810" opacity="0.5" />
        <polygon points="74,43 94,28 94,60" fill="#EE7020" />
        <polygon points="74,43 84,32 86,60" fill="#FF9848" opacity="0.4" />
        {/* body shadow + body */}
        <ellipse cx="51" cy="47" rx="34" ry="23" fill="#C05010" />
        <ellipse cx="50" cy="46" rx="34" ry="23" fill="#F07828" />
        <ellipse cx="34" cy="34" rx="18" ry="10" fill="#FFAA58" opacity="0.5" />
        {/* belly */}
        <ellipse cx="40" cy="52" rx="20" ry="11" fill="#FFEAC8" opacity="0.7" />
        {/* top fin shadow + fin */}
        <polygon points="37,26 50,6 65,26" fill="#C05010" opacity="0.5" />
        <polygon points="36,25 50,4 64,25" fill="#D8401A" />
        <polygon points="36,25 43,12 52,25" fill="#E86040" opacity="0.4" />
        {/* scale arcs */}
        <path
          d="M32 40 Q38 34 44 40"
          stroke="#E06018"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M42 36 Q48 30 54 36"
          stroke="#E06018"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M26 48 Q32 42 38 48"
          stroke="#E06018"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        {/* eye */}
        <circle cx="24" cy="41" r="10" fill="#C05010" opacity="0.35" />
        <circle cx="23" cy="40" r="9.5" fill="#fff" />
        <circle cx="24" cy="40" r="6.5" fill="#1A3A78" />
        <circle cx="25" cy="38" r="2.5" fill="#fff" />
        <circle cx="29" cy="43" r="1" fill="#fff" opacity="0.6" />
        {/* mouth */}
        <path
          d="M10 47 Q15 54 20 48"
          stroke="#C04020"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* bubbles */}
        <circle cx="8" cy="28" r="4" fill="#fff" opacity="0.6" />
        <circle cx="4" cy="18" r="2.8" fill="#fff" opacity="0.45" />
        <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.5" />
        <circle cx="7" cy="26" r="1.5" fill="#fff" opacity="0.4" />
        <ellipse cx="50" cy="92" rx="42" ry="10" fill="#1050A0" opacity="0.2" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#D86020"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#F09040"
          strokeWidth="2.5"
        />
      </symbol>

      {/* 10. Star Owl */}
      <symbol id="avatar-owl" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#0C0C22" />
        {/* stars */}
        <circle cx="14" cy="16" r="1.2" fill="#FFE080" opacity="0.9" />
        <circle cx="86" cy="22" r="0.9" fill="#fff" opacity="0.7" />
        <circle cx="10" cy="74" r="1" fill="#fff" opacity="0.8" />
        <circle cx="88" cy="82" r="1.4" fill="#FFE080" opacity="0.55" />
        <circle cx="50" cy="6" r="1" fill="#fff" opacity="0.65" />
        <circle cx="70" cy="10" r="0.8" fill="#fff" opacity="0.6" />
        <circle cx="22" cy="84" r="1.1" fill="#FFE080" opacity="0.7" />
        {/* body */}
        <ellipse cx="50" cy="88" rx="30" ry="20" fill="#3A34A0" />
        <ellipse cx="39" cy="78" rx="11" ry="6" fill="#5A54C0" opacity="0.45" />
        {/* wings */}
        <ellipse
          cx="26"
          cy="76"
          rx="14"
          ry="22"
          fill="#28228A"
          transform="rotate(-18,26,76)"
        />
        <ellipse
          cx="74"
          cy="76"
          rx="14"
          ry="22"
          fill="#28228A"
          transform="rotate(18,74,76)"
        />
        <ellipse
          cx="25"
          cy="74"
          rx="13"
          ry="21"
          fill="#3030A0"
          transform="rotate(-18,25,74)"
        />
        <ellipse
          cx="73"
          cy="74"
          rx="13"
          ry="21"
          fill="#3030A0"
          transform="rotate(18,73,74)"
        />
        <ellipse
          cx="20"
          cy="66"
          rx="5"
          ry="9"
          fill="#5050C0"
          opacity="0.3"
          transform="rotate(-18,20,66)"
        />
        {/* head shadow + head */}
        <circle cx="51" cy="49" r="30" fill="#28228A" />
        <circle cx="50" cy="48" r="30" fill="#4A44B8" />
        <ellipse cx="37" cy="30" rx="14" ry="9" fill="#7070D0" opacity="0.45" />
        {/* ear tufts */}
        <polygon points="36,24 28,2 42,22" fill="#28228A" opacity="0.7" />
        <polygon points="64,24 72,2 58,22" fill="#28228A" opacity="0.7" />
        <polygon points="35,22 27,2 42,20" fill="#4A44B8" />
        <polygon points="64,22 72,2 57,20" fill="#4A44B8" />
        <polygon points="35,22 31,10 38,20" fill="#6A64C8" opacity="0.4" />
        <polygon points="64,22 68,10 62,20" fill="#6A64C8" opacity="0.4" />
        {/* face disc */}
        <ellipse cx="51" cy="50" rx="22" ry="20" fill="#2A2488" />
        <ellipse
          cx="50"
          cy="49"
          rx="22"
          ry="20"
          fill="#6A64C8"
          opacity="0.55"
        />
        {/* big owl eyes */}
        <circle cx="37" cy="46" r="12" fill="#0C0C22" opacity="0.5" />
        <circle cx="37" cy="45" r="11.5" fill="#F8F0D0" />
        <circle cx="63" cy="46" r="12" fill="#0C0C22" opacity="0.5" />
        <circle cx="63" cy="45" r="11.5" fill="#F8F0D0" />
        {/* iris + depth ring */}
        <circle cx="37" cy="46" r="8" fill="#D0A000" />
        <circle cx="63" cy="46" r="8" fill="#D0A000" />
        <circle cx="37" cy="46" r="6" fill="#B08000" opacity="0.5" />
        <circle cx="63" cy="46" r="6" fill="#B08000" opacity="0.5" />
        {/* pupil */}
        <circle cx="37" cy="46" r="4.5" fill="#0C0C22" />
        <circle cx="63" cy="46" r="4.5" fill="#0C0C22" />
        {/* eye shine */}
        <circle cx="39" cy="43" r="2" fill="#fff" />
        <circle cx="65" cy="43" r="2" fill="#fff" />
        <circle cx="42" cy="49" r="0.9" fill="#fff" opacity="0.6" />
        <circle cx="68" cy="49" r="0.9" fill="#fff" opacity="0.6" />
        {/* beak */}
        <polygon points="51,58 43,68 59,68" fill="#8A6800" opacity="0.5" />
        <polygon points="50,57 42,67 58,67" fill="#D0A000" />
        <polygon points="50,57 50,67 58,67" fill="#E0B820" opacity="0.4" />
        {/* star badge */}
        <circle cx="50" cy="80" r="9" fill="#1A1640" opacity="0.5" />
        <circle cx="50" cy="79" r="8" fill="#2A2460" />
        <text
          x="46"
          y="84"
          fontSize="13"
          fill="#FFD700"
          fontFamily="sans-serif"
        >
          ★
        </text>
        <circle cx="46" cy="76" r="2.5" fill="#FFE880" opacity="0.35" />
        <ellipse cx="50" cy="92" rx="42" ry="10" fill="#06060C" opacity="0.5" />
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#3030A0"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#7070D8"
          strokeWidth="2.5"
        />
      </symbol>
    </svg>
  );
}
