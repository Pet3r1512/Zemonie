import ThemeToggle from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { UserRoundCog } from "lucide-react";

export default function SettingsContainer() {
  return (
    <Card className="p-5">
      <section className="space-y-5">
        <div className="flex items-center gap-x-1 text-secondary">
          <UserRoundCog />
          <p className="lg:text-lg font-bold">Preferences</p>
        </div>
        <div className="flex items-center justify-between md:max-w-xl lg:max-w-2xl px-6 md:px-10">
          <p>Theme</p>
          <ThemeToggle />
        </div>
      </section>
    </Card>
  );
}
