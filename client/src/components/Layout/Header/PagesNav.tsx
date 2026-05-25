const links = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "About Us",
    href: "/about-us",
  },
];

export default function PagesNav() {
  return (
    <ul className="text-md lg:text-lg font-semibold flex items-center gap-x-5">
      {links.map((link) => {
        return (
          <a
            key={link.name}
            href={link.href}
            className="lg:hover:text-primary transition-all duration-150 ease-linear"
          >
            {link.name}
          </a>
        );
      })}
    </ul>
  );
}
