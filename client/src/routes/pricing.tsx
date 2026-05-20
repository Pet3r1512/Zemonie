import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col gap-y-5 my-24 lg:my-0">
        Pricing Page
      </section>
    </Page>
  );
}
