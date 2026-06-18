import Page from "@/components/Layout/Page";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Page pageName="Mock Page Name">
      <p>This is mock content</p>
    </Page>
  ),
});

const routeTree = rootRoute;

const createMockRouter = (initialPath = "/") => {
  const history = createMemoryHistory({
    initialEntries: [initialPath],
  });

  return createRouter({
    routeTree,
    history,
  });
};

const queryClient = new QueryClient();

const meta: Meta<typeof Page> = {
  component: Page,
  globals: {
    viewport: {
      value: "desktop",
    },
  },
  decorators: [
    (_, { parameters }) => {
      const router = createMockRouter(parameters.initialPath || "/");
      return (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const DefaultWithMockContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("main")).toBeInTheDocument();

    expect(canvas.getByRole("header")).toBeInTheDocument();

    expect(canvas.getByRole("page-body"));

    expect(canvas.getByText("This is mock content")).toBeInTheDocument();
  },
};
