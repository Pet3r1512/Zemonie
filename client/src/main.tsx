import { createRouter, RouterProvider, } from "@tanstack/react-router";
import { StrictMode, } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider, } from "react-helmet-async";
import "./index.css";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import { ReactQueryDevtools, } from "@tanstack/react-query-devtools";
import LoadingScreen from "./components/Layout/LoadingScreen";
import { ErrorPage, NotFoundPage, } from "./components/ui/ErrorPage";
import { routeTree, } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingScreen,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
},);

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root",)!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement,);
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
