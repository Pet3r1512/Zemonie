import FeatureCards from "@/components/Layout/Home/Features/FeatureCards";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof FeatureCards> = {
  component: FeatureCards,
  globals: {
    viewport: {
      value: "desktop",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCards>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const CardHoverEffect = canvas.getByRole("card-hover-effect");

    expect(CardHoverEffect).toBeInTheDocument();

    expect(canvas.getByTestId("Smart Icon Tracking")).toBeInTheDocument();

    expect(
      canvas.getByText(
        "Set up your salary schedule and recurring income. Clario automatically adds them on the right dates.",
      ),
    ).toBeInTheDocument();

    expect(canvas.getByTestId("Expense Categorization")).toBeInTheDocument();

    expect(
      canvas.getByText(
        "Label your expenses for better tracking. Organize spending into categories like food, entertainment, and more.",
      ),
    ).toBeInTheDocument();

    expect(canvas.getByTestId("Visual Insights")).toBeInTheDocument();

    expect(
      canvas.getByText(
        "Beautiful charts and graphs help you understand your spending habits and financial patterns.",
      ),
    ).toBeInTheDocument();
  },
};
