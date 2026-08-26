import { Separator } from "@/components/ui/separator";
import UpdatePassword from "./UpdatePassword";

export default function Security() {
  return (
    <section className="space-y-6">
      <p className="lg:text-lg font-bold text-secondary">Account Security</p>
      <Separator className="dark:bg-white/15 md:max-w-xl lg:max-w-2xl" />
      <p className="text-secondary font-semibold">Update Password</p>
      <UpdatePassword />
    </section>
  );
}
