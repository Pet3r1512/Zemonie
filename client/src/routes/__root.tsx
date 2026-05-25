import { Release } from "@/components/Banner/Release";
import { warmupDb } from "@/lib/ping";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  beforeLoad: () => {
    warmupDb();
  },
  component: () => (
    <>
      <Release />
      <Outlet />
    </>
  ),
});
