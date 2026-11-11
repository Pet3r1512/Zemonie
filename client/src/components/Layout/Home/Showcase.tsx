import Starfield from "@/components/Layout/Starfield";

export default function Showcase() {
  return (
    <section
      aria-label="dashboard-preview"
      className="relative overflow-hidden px-4 py-16 md:py-24 dark:bg-black"
    >
      <Starfield seed={4242} className="hidden dark:block" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-[14px] border border-gray-200 bg-white shadow-xl dark:border-[#ff7900]/25 dark:bg-[#08080a]/85 dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] shadow-[0_0_16px_2px_rgba(255,121,0,0.6)]" />
          <img
            src="/screenshots/Dashboard-dark.webp"
            alt="Zemonie dashboard screenshot"
            className="block h-auto w-full"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
