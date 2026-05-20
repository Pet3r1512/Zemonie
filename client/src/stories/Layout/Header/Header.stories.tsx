import Header from "@/components/Layout/Header";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Header />,
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

    const logoWrapper = canvas.getByTestId("logo-wrapper");
    const navbar = canvas.getByTestId("navbar");

    await expect(logoWrapper).toBeInTheDocument();
    await expect(navbar).toBeInTheDocument();
  },
};

export const DesktopHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("navbar")).toBeVisible();
    await expect(canvas.getByTestId("logo-wrapper")).toBeVisible();

    await expect(
      canvas.queryByRole("button", { name: /menu/i }),
    ).not.toBeInTheDocument();
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

    await expect(canvas.getByTestId("logo-wrapper")).toBeVisible();
    await expect(canvas.getByTestId("navbar")).not.toBeVisible();

    await expect(screen.queryByRole("button")).toBeVisible();
  },
};
