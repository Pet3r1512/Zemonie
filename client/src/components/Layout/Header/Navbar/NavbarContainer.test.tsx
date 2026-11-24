import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NavbarContainer from "./NavbarContainer";

const { routerState } = vi.hoisted(() => ({
  routerState: { location: { href: "/features" } },
}));

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ state: routerState }),
}));

vi.mock("./Navbar", () => ({
  default: () => <div data-testid="navbar" />,
}));

function setHref(href: string) {
  routerState.location.href = href;
}

describe("NavbarContainer", () => {
  beforeEach(() => {
    setHref("/features");
  });

  it("renders the navbar on non-auth routes", async () => {
    render(<NavbarContainer />);

    await waitFor(() => {
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });
  });

  it("hides the navbar on auth routes", async () => {
    setHref("/auth/signin");
    render(<NavbarContainer />);

    await waitFor(() => {
      expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    });
  });
});
