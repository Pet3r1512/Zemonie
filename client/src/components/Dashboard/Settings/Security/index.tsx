import UpdatePassword from "./UpdatePassword";

export default function Security() {
  return (
    <section className="space-y-6">
      <p className="lg:text-lg font-bold text-secondary">Account Security</p>
      <UpdatePassword />
    </section>
  );
}
