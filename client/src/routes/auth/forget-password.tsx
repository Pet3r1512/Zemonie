import ForgetPassword from "@/components/Auth/ForgetPassword";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forget-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO title="Forget Password" description="" canonicalPath="/auth/forget-password" noIndex />
      <Page hideHeader>
        <ForgetPassword />
      </Page>
    </>
  );
}
