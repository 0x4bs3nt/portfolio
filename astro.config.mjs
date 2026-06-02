// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://4bs3nt.com",
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "github-dark-high-contrast",
        light: "github-light-high-contrast",
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
