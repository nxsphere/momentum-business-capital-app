import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    cloudflare({
      configPath: "./wrangler.toml",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}); 