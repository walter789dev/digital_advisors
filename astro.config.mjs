import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import dotenv from 'dotenv';
import netlify from "@astrojs/netlify";

dotenv.config();

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://www.digitaladvisors.com.ar",
  integrations: [sitemap()],
  output: "server",
  adapter: netlify(),
});
