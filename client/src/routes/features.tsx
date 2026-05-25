import Features from "@/components/Features";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page pageName="Features" fullScreen>
      <Features />
    </Page>
  );
}
