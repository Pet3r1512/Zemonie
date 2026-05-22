import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";

export default function Header() {
  return (
    <header
      role="header"
      className="w-full flex justify-between items-center max-w-7xl mx-auto px-5 lg:px-0 py-10 lg:py-5"
    >
      <Logo />
      <Navbar />
    </header>
  );
}
