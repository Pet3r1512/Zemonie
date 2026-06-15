import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./components/Layout/LoadingScreen";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotFoundPage, ErrorPage } from "./components/ui/ErrorPage";

const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingScreen,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>,
  );
}
