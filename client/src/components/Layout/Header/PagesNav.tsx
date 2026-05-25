import { pages } from "@/lib/navigations";

export default function PagesNav() {
  return (
    <ul className="text-md lg:text-lg font-semibold hidden md:flex items-center gap-x-5">
      {pages.map((link) => {
        return (
          <a
            key={link.name}
            href={link.link}
            className="lg:hover:text-primary transition-all duration-150 ease-linear"
          >
            {link.name}
          </a>
        );
      })}
    </ul>
  );
}
