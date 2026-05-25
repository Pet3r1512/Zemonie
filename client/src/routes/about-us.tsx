import About from "@/components/AboutUs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return <About />;
}
