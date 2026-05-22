import Logo from "../Logo";
import CommonLinks from "./CommonLinks";

export default function Footer() {
  return (
    <footer className="bg-[#111827] w-screen! mt-auto text-white">
      <div className="footer-container max-w-7xl mx-auto py-10 px-5 lg:px-0 flex gap-x-24">
        <div className="flex flex-col gap-y-5 w-1/4">
          <Logo />
          <p>
            Smart money management for{" "}
            <strong className="text-primary">GenZ</strong>. Take control of your
            finances today.
          </p>
        </div>
        <CommonLinks />
      </div>
    </footer>
  );
}
