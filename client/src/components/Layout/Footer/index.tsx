import FooterBottom from "./FooterBottom";
import FooterTop from "./FooterTop";

export default function Footer() {
  return (
    <footer className="relative z-10 w-screen! mt-auto text-white bg-[#111827] dark:bg-black dark:border-t dark:border-white/10">
      <div className="footer-container max-w-7xl mx-auto py-10 px-5 lg:px-0 flex flex-col gap-y-12">
        <FooterTop />
        {/* Divider */}
        <div className="divider h-px rounded-full bg-gray-700 dark:bg-white/10 w-full mx-auto"></div>
        {/*  */}
        <FooterBottom />
      </div>
    </footer>
  );
}
