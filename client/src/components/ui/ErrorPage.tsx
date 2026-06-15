import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import Page from "@/components/Layout/Page";

function ErrorContent({
  statusCode,
  title,
  description,
  error,
  imageURL,
  reset,
}: {
  statusCode: number;
  title: string;
  description: string;
  error?: Error | null;
  imageURL: string;
  reset?: () => void;
}) {
  return (
    <Page className="flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl py-20">
        <img src={imageURL} className="h-auto w-275" />
        {error && import.meta.env.DEV && (
          <pre className="text-xs text-left bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md overflow-auto max-w-full whitespace-pre-wrap">
            {error.message}
            {error.stack ? `\n\n${error.stack}` : ""}
          </pre>
        )}
        <div className="flex gap-3 mt-4">
          <Button className="bg-primary hover:bg-primary/95" variant="default" asChild>
            <Link to="/">Go Home</Link>
          </Button>
          {reset && (
            <Button className="bg-primary hover:bg-primary/95" variant="outline" onClick={reset}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Page>
  );
}

export function NotFoundPage() {
  return (
    <ErrorContent
      statusCode={404}
      title="Page not found"
      description="The page you are looking for does not exist or has been moved."
      imageURL="/errors/zemonie_404_error.svg"
    />
  );
}

export function ErrorPage({ error, reset }: { error?: Error | null; reset?: () => void }) {
  return (
    <ErrorContent
      statusCode={500}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      error={error}
      imageURL="/errors/zemonie_500_error.svg"
      reset={reset}
    />
  );
}
