import Screenshot from "@/components/Layout/Home/Hero/Screenshot";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof Screenshot> = {
  component: Screenshot,
  globals: {
    viewport: {
      value: "desktop",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Screenshot>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByAltText("Clario Dashboard Screenshot"),
    ).toBeInTheDocument();
  },
};
