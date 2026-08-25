import { Lock } from "lucide-react";

export default function Security() {
  return (
    <section>
      <div className="flex items-center gap-x-1 text-secondary">
        <Lock />
        <p className="lg:text-lg font-bold">Security</p>
      </div>
    </section>
  );
}
