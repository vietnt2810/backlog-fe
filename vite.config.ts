import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/__mocks__": path.resolve(__dirname, "./__mocks__"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), svgr()],
  server: {
    port: 3021,
  },
});
