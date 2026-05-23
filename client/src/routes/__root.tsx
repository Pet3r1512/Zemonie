import { warmupDb } from "@/lib/ping";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  beforeLoad: () => {
    warmupDb();
  },
});
