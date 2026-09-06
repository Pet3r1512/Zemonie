import ResetPassword from "@/components/Auth/ResetPassword";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forget-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
    error: typeof search.error === "string" ? search.error : "",
  }),
  beforeLoad: ({ search }) => {
    if (!search.token && !search.error) {
      throw redirect({ to: "/auth/signin" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { token, error } = Route.useSearch();

  return (
    <>
      <SEO
        title="Reset Password"
        description="Set a new password for your Zemonie account."
        canonicalPath="/auth/forget-password"
        noIndex
      />
      <Page hideHeader>
        <ResetPassword token={token} error={error} />
      </Page>
    </>
  );
}
