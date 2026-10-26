import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import VersionTag from "./VersionTag";

const renderVersionTag = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <VersionTag />
    </QueryClientProvider>,
  );
};

describe("Version Tag", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise(() => {}));

    renderVersionTag();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows the latest tag", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ name: "v1.1.4" }, { name: "v1.1.3" }, { name: "v1.1.2" }]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    renderVersionTag();
    expect(await screen.findByText("v1.1.4")).toBeInTheDocument();
  });

  it("returns empty tag when GitHub returns no tags", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    renderVersionTag();
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith("https://api.github.com/repos/Pet3r1512/Zemonie/tags");
  });
});
