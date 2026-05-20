import Hero from "@/components/Layout/Home/Hero";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof Hero> = {
  component: Hero,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const HeroSection = canvas.getByRole("region");

    expect(HeroSection).toBeInTheDocument();

    const HeroTitle = canvas.getByRole("heading");

    expect(HeroTitle).toBeInTheDocument();
    expect(HeroTitle.textContent).toBe("Manage Your Finances with Clario");

    const HeroDesc = canvas.getByRole("description");

    expect(HeroDesc).toBeInTheDocument();
    expect(HeroDesc.textContent).toBe(
      "Clario is the all-in-one money management tool that helps you track your income, label your expenses, and visualize your financial data. Get started today and achieve your financial goals.",
    );

    const ActionBtns = canvas.getByRole("action-buttons");
    expect(ActionBtns).toBeInTheDocument();

    const GetStartedBtn = canvas.getByText("Get started");
    expect(GetStartedBtn).toBeInTheDocument();

    const LearnMoreBtn = canvas.getByText("Learn more");
    expect(LearnMoreBtn).toBeInTheDocument();
  },
};
