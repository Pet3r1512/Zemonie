import SignIn from "@/components/Auth/SignIn";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session?.data?.session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your Zemonie account to manage your finances."
        canonicalPath="/auth/signin"
        noIndex
      />
      <Page hideHeader>
        <SignIn />
      </Page>
    </>
  );
}
