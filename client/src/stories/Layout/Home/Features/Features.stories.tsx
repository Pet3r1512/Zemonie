import Features from "@/components/Layout/Home/Features";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof Features> = {
  component: Features,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Features>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const FeaturesSection = canvas.getByRole("region");

    expect(FeaturesSection).toBeInTheDocument();

    const FeatureTitle = canvas.getByRole("heading", {
      name: /Powerful Features/i,
    });

    expect(FeatureTitle).toBeInTheDocument();

    expect(canvas.getByRole("description").textContent).toBe(
      "Everything you need to manage your money effectively in one place",
    );

    expect(canvas.getByRole("card-hover-effect")).toBeInTheDocument();
  },
};
