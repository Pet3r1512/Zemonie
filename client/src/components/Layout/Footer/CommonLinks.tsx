type CommonLinkItem = {
  name: string;
  href: string;
};

type CommonLinks = {
  title: string;
  items: CommonLinkItem[];
};

const links: CommonLinks[] = [
  {
    title: "Product",
    items: [
      {
        name: "Features",
        href: "/features",
      },
      {
        name: "Release Notes",
        href: "/release-notes",
      },
      {
        name: "FAQ",
        href: "/faq",
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        name: "About Us",
        href: "/about-us",
      },
    ],
  },
  {
    title: "Legal",
    items: [
      {
        name: "Terms of Service",
        href: "/terms",
      },
      {
        name: "Privacy Policy",
        href: "/privacy",
      },
      {
        name: "Cookie Policy",
        href: "/cookie-policy",
      },
    ],
  },
];

export default function CommonLinks() {
  return (
    <section className="flex-1 flex flex-col md:flex-row md:justify-end md:gap-x-18 lg:gap-x-48 gap-y-10">
      {links.map((link,) => {
        return (
          <div key={link.title} className="flex flex-col gap-y-4">
            <p className="font-bold text-lg cursor-default pointer-events-none">{link.title}</p>
            <div className="flex flex-col gap-y-2">
              {link.items.map((item,) => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="lg:hover:text-secondary transition-all duration-150 ease-linear"
                  >
                    {item.name}
                  </a>
                );
              },)}
            </div>
          </div>
        );
      },)}
    </section>
  );
}
