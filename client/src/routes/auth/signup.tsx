import SignUp from "@/components/Auth/SignUp";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="Sign Up"
        description="Create a free Zemonie account and start tracking your finances today."
        canonicalPath="/auth/signup"
        noIndex
      />
      <Page hideHeader>
        <SignUp />
      </Page>
    </>
  );
}
