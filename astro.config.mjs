import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.digitaladvisors.com.ar",
  integrations: [sitemap()],
});
