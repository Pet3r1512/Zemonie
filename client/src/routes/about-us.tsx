import About from "@/components/AboutUs";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page pageName="About Us" fullScreen>
      <About />
    </Page>
  );
}
