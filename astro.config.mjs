import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static output, served as Cloudflare Workers static assets (see wrangler.jsonc).
export default defineConfig({
  site: "https://pobuda.estate",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
