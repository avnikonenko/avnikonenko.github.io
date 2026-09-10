/* global Buffer, Image, document */

/**
 * Generates the served image variants from the full-size sources.
 *
 *   npm run icons
 *
 * Sources (all 1254x1254):
 *   assets/logo.png       -> favicon, social preview, home page logo (dark theme)
 *   assets/logo-dark.png  -> home page logo, light theme
 *
 * The full-size sources live outside public/ so they are build inputs only and
 * are not deployed; the generated variants in public/ are what the site serves.
 *
 * Uses the Playwright browser installed for the e2e tests, so no image
 * toolchain is needed. Each source is trimmed to its visible artwork so the
 * mark fills the square, and sources whose corners are opaque are then masked
 * to their circle, otherwise the artwork's black backdrop shows as a square.
 * Rerun whenever a source image changes.
 */
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const JOBS = [
  { source: "assets/logo.png", output: "public/icon-32.png", size: 32 },
  { source: "assets/logo.png", output: "public/icon-180.png", size: 180 },
  { source: "assets/logo.png", output: "public/icon-512.png", size: 512 },
  { source: "assets/logo.png", output: "public/logo-256.png", size: 256 },
  {
    source: "assets/logo-dark.png",
    output: "public/logo-dark-256.png",
    size: 256,
  },
];

const browser = await chromium.launch();
const page = await browser.newPage();

const cache = new Map();
async function dataUri(source) {
  if (!cache.has(source)) {
    cache.set(
      source,
      `data:image/png;base64,${(await readFile(source)).toString("base64")}`,
    );
  }
  return cache.get(source);
}

for (const { source, output, size } of JOBS) {
  const base64 = await page.evaluate(
    async ([uri, target]) => {
      const image = new Image();
      image.src = uri;
      await image.decode();

      const canvas = document.createElement("canvas");
      canvas.width = target;
      canvas.height = target;
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      // Trim the transparent margin first: a source may fill only part of
      // its canvas, which would leave a tiny mark in a 32px browser tab.
      const probe = document.createElement("canvas");
      probe.width = image.width;
      probe.height = image.height;
      const probeContext = probe.getContext("2d");
      probeContext.drawImage(image, 0, 0);
      const { data } = probeContext.getImageData(
        0,
        0,
        probe.width,
        probe.height,
      );

      let minX = probe.width;
      let minY = probe.height;
      let maxX = -1;
      let maxY = -1;
      for (let y = 0; y < probe.height; y += 1) {
        for (let x = 0; x < probe.width; x += 1) {
          if (data[(y * probe.width + x) * 4 + 3] > 12) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX < 0) {
        minX = 0;
        minY = 0;
        maxX = probe.width - 1;
        maxY = probe.height - 1;
      }

      // Keep the crop square and centred so a round mark stays round.
      const side = Math.max(maxX - minX + 1, maxY - minY + 1);
      const cropX = (minX + maxX + 1) / 2 - side / 2;
      const cropY = (minY + maxY + 1) / 2 - side / 2;

      context.drawImage(image, cropX, cropY, side, side, 0, 0, target, target);

      // Opaque corners mean the artwork carries its own backdrop; clip it to
      // the circle so the logo sits on any page colour.
      const corner = context.getImageData(0, 0, 1, 1).data[3];
      if (corner > 8) {
        context.globalCompositeOperation = "destination-in";
        context.beginPath();
        context.arc(target / 2, target / 2, target / 2, 0, Math.PI * 2);
        context.fill();
        context.globalCompositeOperation = "source-over";
      }

      return {
        data: canvas.toDataURL("image/png").split(",")[1],
        masked: corner > 8,
      };
    },
    [await dataUri(source), size],
  );

  await writeFile(output, Buffer.from(base64.data, "base64"));
  console.log(
    `${output} (${size}x${size}) from ${source}${base64.masked ? " — masked to circle" : ""}`,
  );
}

await browser.close();
