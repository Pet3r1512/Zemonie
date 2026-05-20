import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Logo from "../Logo";
import { mobileAuthNavLinks } from "@/lib/navigations";

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
      <DrawerContent className="h-dvh px-5 py-7 w-2/3! max-w-sm! rounded-r-none flex flex-col gap-y-5">
        <Logo className="h-24" />
        {/* <div className="font-semibold text-lg flex flex-col gap-y-5">
          <a href="/pricing">Pricing</a>
          <div className="flex justify-between items-center">
            <p>Theme</p>
            <ThemeToggle />
          </div>
        </div> */}
        <div className="mt-auto flex flex-col gap-y-3.5">
          {mobileAuthNavLinks.map((nav) => {
            return (
              <a key={nav.name} href={nav.link} className={nav.className}>
                {nav.name}
              </a>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
