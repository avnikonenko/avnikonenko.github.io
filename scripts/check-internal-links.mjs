import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const basePath = normalizeBase(process.env.BASE_PATH ?? "/");
const htmlFiles = [];
const failures = [];

function normalizeBase(value) {
  if (!value || value === "/") return "/";
  const withSlashes = `/${value.replace(/^\/|\/$/g, "")}/`;
  return withSlashes;
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (entry.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function stripBase(href) {
  if (basePath === "/") return href;
  return href.startsWith(basePath) ? href.slice(basePath.length - 1) : href;
}

function pathExists(href) {
  const withoutHash = stripBase(href.split("#")[0]);
  if (!withoutHash || withoutHash === "/") {
    return existsSync(path.join(distDir, "index.html"));
  }

  const clean = withoutHash.replace(/^\/+/, "");
  const targetFile = path.join(distDir, clean);
  const targetIndex = path.join(distDir, clean, "index.html");
  return existsSync(targetFile) || existsSync(targetIndex);
}

if (!existsSync(distDir)) {
  throw new Error("dist directory does not exist. Run astro build first.");
}

walk(distDir);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const matches = html.matchAll(/\s(?:href|src)="([^"]+)"/g);

  for (const [, href] of matches) {
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("data:") ||
      href.startsWith("#") ||
      href.startsWith("[ADD OR VERIFY:")
    ) {
      continue;
    }

    if (href.startsWith("/") && !pathExists(href)) {
      failures.push(`${path.relative(process.cwd(), file)} -> ${href}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Broken internal links or assets:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files for internal links.`);
