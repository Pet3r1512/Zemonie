import ThemeToggle from "@/components/ThemeToggle";
import { expect, } from "@storybook/jest";
import type { Meta, StoryObj, } from "@storybook/react-vite";
import { userEvent, within, } from "@storybook/testing-library";

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};

export const TogglesTheme: Story = {
  play: async ({ canvasElement, },) => {
    const canvas = within(canvasElement,);

    const toggle = canvas.getByRole("checkbox", {
      name: /toggle theme/i,
    },);

    const DOM = document.documentElement;

    await expect(DOM.classList.contains("dark",),).toBe(false,);

    await userEvent.click(toggle,);
    await expect(DOM.classList.contains("dark",),).toBe(true,);

    await userEvent.click(toggle,);
    await expect(DOM.classList.contains("dark",),).toBe(false,);
  },
};
