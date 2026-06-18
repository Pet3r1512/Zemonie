import VersionTag from "@/components/Banner/VersionTag";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { mobileAuthNavLinks, pages } from "@/lib/navigations";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import Logo from "../Logo";

export default function Sidebar() {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="md:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerHeader className="hidden">
        <VisuallyHidden className="hidden" asChild>
          {/* Don't care about this =)) */}
          <DrawerTitle>Hidden Drawer Title</DrawerTitle>
        </VisuallyHidden>
      </DrawerHeader>
      <DrawerContent className="h-dvh px-5 py-7 w-2/3! max-w-sm! rounded-r-none flex flex-col gap-y-8 lg:gap-y-5">
        <Logo className="lg:h-24" />
        <div className="font-semibold text-lg flex flex-col gap-y-5">
          {pages.map((page) => {
            return (
              <Link key={page.name} to={page.link}>
                {page.name}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto flex flex-col gap-y-3.5">
          {mobileAuthNavLinks.map((nav) => {
            return (
              <a key={nav.name} href={nav.link} className={nav.className}>
                {nav.name}
              </a>
            );
          })}
        </div>
        <VersionTag />
      </DrawerContent>
    </Drawer>
  );
}
