type CommonLinkItem = {
  name: string;
  href: string;
};

type CommonLinks = {
  title: string;
  items: CommonLinkItem[];
};

export default function CommonLinks() {
  const links: CommonLinks[] = [
    {
      title: "Product",
      items: [
        // {
        //     name: "Features",
        //     href: ""
        // },
        // {
        //     name: "Pricing",
        //     href: ""
        // },
        {
          name: "Testimonials",
          href: "#",
        },
        {
          name: "FAQ",
          href: "#",
        },
      ],
    },
    {
      title: "Company",
      items: [
        {
          name: "About Us",
          href: "#",
        },
        {
          name: "Contract",
          href: "#",
        },
        // {
        //     name: "Help Center",
        //     href: ""
        // }
      ],
    },
    {
      title: "Legal",
      items: [
        {
          name: "Terms of Service",
          href: "#",
        },
        {
          name: "Privacy Policy",
          href: "#",
        },
        {
          name: "Cookie Policy",
          href: "#",
        },
      ],
    },
  ];
  return (
    <section className="flex-1 flex justify-end gap-x-48">
      {links.map((link) => {
        return (
          <div key={link.title} className="flex flex-col gap-y-4">
            <p className="font-bold text-lg cursor-default pointer-events-none">
              {link.title}
            </p>
            <div className="flex flex-col gap-y-2">
              {link.items.map((item) => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="lg:hover:text-secondary transition-all duration-150 ease-linear"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
