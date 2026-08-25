import { Lock } from "lucide-react";
import UpdatePassword from "./UpdatePassword";

export default function Security() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-x-1 text-secondary">
        <Lock />
        <p className="lg:text-lg font-bold">Security</p>
      </div>
      <UpdatePassword />
    </section>
  );
}
