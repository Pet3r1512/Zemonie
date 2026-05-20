import Page from "@/components/Layout/Page";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";
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
      // Render RouterProvider only, Story will be rendered by the router
      return <RouterProvider router={router} />;
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
