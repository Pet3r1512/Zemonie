import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  beforeLoad: async () => {
    fetch("https://api.zemonie.site/api/ping").catch(() => {});
  },
});
