import Sidebar from "@/components/Layout/Header/Sidebar";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { createRouter, RouterProvider, createRootRoute } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Sidebar />,
});
const router = createRouter({ routeTree: rootRoute });

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  decorators: [
    () => <RouterProvider router={router} />,
  ],
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const DesktopSidebar: Story = {
  play: async () => {
    await expect(screen.queryByRole("button")).not.toBeInTheDocument();
  },
};

export const MobileSidebar: Story = {
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const MenuIcon = canvas.getByRole("button");

    await expect(MenuIcon).toBeInTheDocument();

    await userEvent.click(MenuIcon);

    const bodyCanvas = within(document.body);

    await expect(bodyCanvas.getByRole("dialog")).toBeInTheDocument();
  },
};
