import Logo from "../Logo";
import CommonLinks from "./CommonLinks";

export default function FooterTop() {
  return (
    <div className="flex flex-col md:flex-row w-full md:gap-x-4 lg:gap-x-24 gap-y-12">
      <div className="flex flex-col gap-y-5 md:w-1/3 lg:w-1/4">
        <Logo />
        <p>
          Smart money management for{" "}
          <strong className="text-primary">GenZ</strong>. Take control of your
          finances today.
        </p>
      </div>
      <CommonLinks />
    </div>
  );
}
