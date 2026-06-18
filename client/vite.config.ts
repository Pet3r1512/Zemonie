import { cloudflare, } from "@cloudflare/vite-plugin";
import { tanstackRouter, } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, } from "vite";

export default defineConfig(({ mode, },) => {
  const isTest = mode === "test";

  return {
    plugins: [
      tanstackRouter({
        routesDirectory: "src/routes",
      },),
      react(),
      !isTest && cloudflare(),
    ].filter(Boolean,),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src",),
      },
    },
    server: {
      proxy: {
        "/api": "http://localhost:8787",
      },
    },
  };
},);
