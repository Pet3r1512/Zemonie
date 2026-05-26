import SignUp from "@/components/Auth/SignUp";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <SignUp />
    </Page>
  );
}
