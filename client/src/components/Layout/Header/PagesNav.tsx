import { pages } from "@/lib/navigations";
import { Link } from "@tanstack/react-router";

export default function PagesNav() {
  return (
    <ul className="text-md lg:text-lg font-semibold hidden md:flex items-center gap-x-5">
      {pages.map((link) => {
        return (
          <Link
            key={link.name}
            to={link.link}
            className="lg:hover:text-primary transition-all duration-150 ease-linear"
          >
            {link.name}
          </Link>
        );
      })}
    </ul>
  );
}
