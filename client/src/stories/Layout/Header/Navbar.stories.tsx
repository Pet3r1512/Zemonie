import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Navbar from "@/components/Layout/Header/Navbar/Navbar";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const DesktopNavbar: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("navbar")).toBeVisible();
  },
};

export const MobileNavbar: Story = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("navbar")).not.toBeVisible();
  },
};
