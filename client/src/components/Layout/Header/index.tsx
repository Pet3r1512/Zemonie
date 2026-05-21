import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";

export default function Header() {
  return (
    <header
      role="header"
      className="flex justify-between items-center max-w-7xl mx-auto px-5 lg:px-0 py-5 md:py-6 lg:py-7"
    >
      <Logo />
      <Navbar />
    </header>
  );
}
