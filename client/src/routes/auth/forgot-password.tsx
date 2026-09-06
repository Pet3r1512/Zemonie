import ForgotPassword from "@/components/Auth/ForgotPassword";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="Forgot Password"
        description="Enter your email to receive a link to reset your Zemonie password."
        canonicalPath="/auth/forgot-password"
        noIndex
      />
      <Page hideHeader>
        <ForgotPassword />
      </Page>
    </>
  );
}
