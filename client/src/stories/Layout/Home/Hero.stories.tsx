import Hero from "@/components/Layout/Home/Hero";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof Hero> = {
  component: Hero,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const HeroSection = canvas.getByRole("region");

    expect(HeroSection).toBeInTheDocument();

    const TitlePrimary = canvas.getByRole("heading", { level: 1 });

    expect(TitlePrimary).toBeInTheDocument();
    expect(TitlePrimary.textContent).toContain("Manage Your Finances with");
    expect(TitlePrimary.textContent).toContain("Zemonie");

    const HeroDesc = canvas.getByRole("description");

    expect(HeroDesc).toBeInTheDocument();
    expect(HeroDesc.textContent).toContain(
      "Zemonie is the all-in-one money management tool that helps you track your income, label your expenses, and visualize your financial data. Get started today and achieve your financial goals.",
    );

    const ActionBtns = canvas.getByRole("cta-buttons-group");
    expect(ActionBtns).toBeInTheDocument();

    const GetStartedBtn = canvas.getByText("Get started");
    expect(GetStartedBtn).toBeInTheDocument();

    const LearnMoreBtn = canvas.getByText("Learn More");
    expect(LearnMoreBtn).toBeInTheDocument();
  },
};
