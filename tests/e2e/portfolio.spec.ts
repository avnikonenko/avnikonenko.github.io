import { expect, test } from "@playwright/test";

test("landing page carries the about content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Aleksandra Ivanova", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Computational Chemist and Scientific Software Developer · Olomouc, Czech Republic",
    ),
  ).toBeVisible();
  await expect(page.getByText(/Open to research, postdoctoral/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Download CV \(PDF\)/i }).first(),
  ).toBeVisible();
});

test("main navigation reaches required pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });

  await expect(nav.getByRole("link", { name: "Home" })).toHaveCount(0);
  await expect(nav.getByRole("link", { name: "About" })).toHaveCount(0);

  for (const name of ["Experience", "Projects", "Publications", "Contact"]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}/$`));
  }
});

test("CV is reachable as a PDF from the navigation", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const cvLink = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: /CV \(PDF\)/i });
  const href = await cvLink.getAttribute("href");
  expect(href).toMatch(/CV_Ivanova\.pdf$/);

  const response = await request.get(href as string);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("removed pages are gone", async ({ request }) => {
  for (const path of ["/cv/", "/about/"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  }
});

test("project pages and publication page render", async ({ page }) => {
  await page.goto("/projects/");
  await page
    .getByRole("link", { name: /StreaMD/i })
    .first()
    .click();
  await expect(page.getByRole("heading", { name: "StreaMD" })).toBeVisible();

  await page.goto("/publications/");
  await expect(
    page.getByRole("heading", { name: "Publications", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Copy citation/i }).first(),
  ).toBeVisible();
});

test("publication filters hide non-matching entries", async ({ page }) => {
  await page.goto("/publications/");
  const cards = page.locator("[data-publication-card]");
  const total = await cards.count();
  expect(total).toBeGreaterThan(1);
  await expect(cards.filter({ visible: true })).toHaveCount(total);

  await page.getByLabel("Year").selectOption("2024");
  const visibleForYear = await cards.filter({ visible: true }).count();
  expect(visibleForYear).toBeGreaterThan(0);
  expect(visibleForYear).toBeLessThan(total);
  await expect(page.locator("[data-filter-count]")).toHaveText(
    `Showing ${visibleForYear} of ${total} entries.`,
  );

  await page.getByLabel("Type").selectOption("Thesis");
  await expect(cards.filter({ visible: true })).toHaveCount(0);

  await page.getByLabel("Year").selectOption("all");
  await expect(cards.filter({ visible: true })).toHaveCount(1);

  await page.getByLabel("Type").selectOption("all");
  await expect(cards.filter({ visible: true })).toHaveCount(total);
  await expect(page.locator("[data-filter-count]")).toHaveText(
    `${total} entries.`,
  );
});

test("her surname is bolded in author lists", async ({ page }) => {
  await page.goto("/publications/");
  const streamd = page
    .locator("[data-publication-card]")
    .filter({ hasText: "StreaMD: the toolkit" });
  await expect(streamd.locator("strong.author-self")).toHaveText(
    "Aleksandra Ivanova",
  );

  const mil = page
    .locator("[data-publication-card]")
    .filter({ hasText: "Multiple Conformer Descriptors" });
  await expect(mil.locator("strong.author-self")).toHaveText("A. Nikonenko");
});

test("navigation stays usable at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: /CV \(PDF\)/i })).toBeVisible();

  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth).toBeLessThanOrEqual(390);
});
