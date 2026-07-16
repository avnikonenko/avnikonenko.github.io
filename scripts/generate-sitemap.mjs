import { readdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const siteUrl = (
  process.env.PUBLIC_SITE_URL ?? "https://avnikonenko.github.io"
).replace(/\/$/, "");
const basePath = normalizeBase(process.env.BASE_PATH ?? "/");
const urls = [];

function normalizeBase(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/|\/$/g, "")}/`;
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.endsWith(".html") || entry === "404.html") continue;

    const relative = path.relative(distDir, fullPath).replace(/\\/g, "/");
    const route =
      relative === "index.html" ? "" : relative.replace(/index\.html$/, "");
    urls.push(`${siteUrl}${basePath}${route}`.replace(/([^:]\/)\/+/g, "$1"));
  }
}

walk(distDir);
urls.sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(path.join(distDir, "sitemap.xml"), xml);
writeFileSync(
  path.join(distDir, "sitemap-index.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${siteUrl}${basePath}sitemap.xml</loc></sitemap>
</sitemapindex>
`,
);

console.log(`Generated sitemap with ${urls.length} URLs.`);
