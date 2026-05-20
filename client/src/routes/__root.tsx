import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  beforeLoad: async () => {
    fetch("https://api.clariofinance.site/api/ping").catch(() => {});
  },
});
