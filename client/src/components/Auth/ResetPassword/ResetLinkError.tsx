import Logo from "@/components/Layout/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert } from "lucide-react";

export default function ResetLinkError() {
  return (
    <div
      data-testid="reset-link-error"
      className="flex flex-col gap-6 w-full md:max-w-106.25 lg:max-w-lg"
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <Logo />
          <CircleAlert className="size-10 text-primary" />
          <CardTitle className="text-xl lg:text-2xl text-primary-dark">
            Link invalid or expired
          </CardTitle>
          <CardDescription className="max-w-md">
            This password reset link is no longer valid. Reset links expire after 1 hour and can
            only be used once.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark transition-all duration-150 ease-linear dark:text-white"
          >
            <a href="/auth/forgot-password">Request a new link</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="/auth/signin">Back to Sign In</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
