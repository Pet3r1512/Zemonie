import { StaggeredMenu } from "@/components/ui/reactbits/staggered-menu";
import { mobileAuthNavLinks, pages } from "@/lib/navigations";

export default function Sidebar() {
  const menuItems = [
    ...pages.map((page) => ({
      label: page.name,
      ariaLabel: `Go to ${page.name}`,
      link: page.link,
    })),
    ...mobileAuthNavLinks.map((nav) => ({
      label: nav.name,
      ariaLabel: nav.name,
      link: nav.link,
    })),
  ];

  return (
    <div className="md:hidden">
      <StaggeredMenu
        position="right"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#111"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#181C23", "#222833"]}
        accentColor="#ff7900"
        isFixed={false}
        closeOnClickAway={true}
      />
    </div>
  );
}
