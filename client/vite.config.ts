import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
  const isTest = mode === "test";

  return {
    plugins: [
      tanstackRouter({
        routesDirectory: "src/routes",
      }),
      react(),
      !isTest && cloudflare(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": "http://localhost:8787",
      },
    },
  };
});
