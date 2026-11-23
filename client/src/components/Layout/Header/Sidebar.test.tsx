import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Sidebar from "./Sidebar";

interface MenuItem {
  label: string;
  link: string;
}

const { menuProps } = vi.hoisted(() => ({
  menuProps: { current: undefined as { items: MenuItem[]; [key: string]: unknown } | undefined },
}));

vi.mock("@/components/ui/reactbits/staggered-menu", () => ({
  StaggeredMenu: (props: { items: MenuItem[]; [key: string]: unknown }) => {
    menuProps.current = props;
    return (
      <div data-testid="staggered-menu">
        {props.items.map((item) => (
          <a key={item.label} href={item.link}>
            {item.label}
          </a>
        ))}
      </div>
    );
  },
}));

describe("Header Sidebar", () => {
  it("renders the mobile menu", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("staggered-menu")).toBeInTheDocument();
  });

  it("passes page links and auth links to the menu", () => {
    render(<Sidebar />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about-us");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "Release Notes" })).toHaveAttribute(
      "href",
      "/release-notes",
    );
    expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute("href", "/auth/signin");
    expect(screen.getByRole("link", { name: "Sign Up" })).toHaveAttribute("href", "/auth/signup");
  });

  it("configures the menu for mobile use", () => {
    render(<Sidebar />);

    expect(menuProps.current).toMatchObject({
      position: "right",
      displaySocials: false,
      displayItemNumbering: true,
      isFixed: false,
      closeOnClickAway: true,
      accentColor: "#ff7900",
    });
  });
});
