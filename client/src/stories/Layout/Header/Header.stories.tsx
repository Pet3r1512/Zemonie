import Header from "@/components/Layout/Header";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { screen, within } from "@storybook/testing-library";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Header hideHeader={false} />,
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

const meta: Meta<typeof Header> = {
  component: Header,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
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

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoWrappers = canvas.getAllByTestId("logo-wrapper");
    const navbar = canvas.getByTestId("navbar");

    await expect(logoWrappers.length).toBeGreaterThanOrEqual(1);
    await expect(navbar).toBeInTheDocument();
  },
};

export const DesktopHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("navbar")).toBeVisible();
    await expect(canvas.getAllByTestId("logo-wrapper")[0]).toBeVisible();
  },
};

export const MobileHeader: Story = {
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoWrappers = canvas.getAllByTestId("logo-wrapper");
    const visibleLogo = logoWrappers.find((el) => el.offsetParent !== null);
    await expect(visibleLogo).toBeVisible();
    await expect(canvas.getByTestId("navbar")).not.toBeVisible();

    await expect(screen.queryByRole("button")).toBeVisible();
  },
};
