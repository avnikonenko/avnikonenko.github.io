import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://avnikonenko.github.io";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
});
