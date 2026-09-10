import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { withBase } from "./paths";

/**
 * Appends a short content hash to a file in public/, so a replaced image is
 * refetched instead of served from the browser's favicon cache — which is kept
 * separately from the page cache and survives ordinary reloads.
 */
const hashes = new Map<string, string>();

export function versioned(publicPath: string): string {
  const url = withBase(publicPath);

  if (!hashes.has(publicPath)) {
    let hash = "";
    try {
      const file = readFileSync(
        path.join("public", publicPath.replace(/^\/+/, "")),
      );
      hash = createHash("sha1").update(file).digest("hex").slice(0, 8);
    } catch {
      // Missing file: fall back to the plain URL rather than failing the build.
      hash = "";
    }
    hashes.set(publicPath, hash);
  }

  const hash = hashes.get(publicPath);
  return hash ? `${url}?v=${hash}` : url;
}
