import { expect, test } from "@playwright/test";

test("landing page is the identity block only", async ({ page }) => {
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
  await expect(page.getByRole("heading", { name: "Skills" })).toHaveCount(0);

  // The CV is reached through the nav item, not an in-page download link.
  await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);
});

test("about page carries the biography and skills", async ({ page }) => {
  await page.goto("/about/");
  await expect(
    page.getByRole("heading", { name: "Aleksandra Ivanova" }),
  ).toHaveCount(0);
  await expect(
    page.getByText(
      "Computational Chemist and Scientific Software Developer · Olomouc, Czech Republic",
    ),
  ).toHaveCount(0);
  await expect(page.getByText(/Open to research, postdoctoral/)).toHaveCount(0);
  await expect(
    page.getByText(
      /I develop computational methods and reproducible workflows/,
    ),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();

  // The CV is reached through the nav item, not an in-page download link.
  await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);
});

test("main navigation reaches required pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });

  await expect(nav.getByRole("link", { name: "Home" })).toHaveCount(0);

  for (const name of [
    "About",
    "Experience",
    "Projects",
    "Publications",
    "Contact",
  ]) {
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
    .getByRole("link", { name: /^CV$/ });
  const href = await cvLink.getAttribute("href");
  expect(href).toMatch(/CV_Ivanova\.pdf$/);

  const response = await request.get(href as string);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("the CV is reachable from the nav, and from the contact page", async ({
  page,
}) => {
  // Every page reaches the PDF through the nav item.
  for (const path of ["/", "/about/", "/experience/", "/contact/"]) {
    await page.goto(path);
    await expect(
      page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "CV", exact: true }),
      path,
    ).toBeVisible();
  }

  // The footer carries no links, and only contact adds a download link.
  await page.goto("/");
  await expect(page.locator(".site-footer a")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);

  await page.goto("/contact/");
  const download = page.getByRole("link", { name: /Download CV/i });
  await expect(download).toHaveCount(1);
  await expect(download).toHaveAttribute("href", /CV_Ivanova\.pdf$/);
});

test("the on-site CV page is gone", async ({ request }) => {
  const response = await request.get("/cv/", { maxRedirects: 0 });
  expect(response.status()).toBe(404);
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
  await expect(nav.getByRole("link", { name: /^CV$/ })).toBeVisible();

  const scrollWidth = await page.evaluate(
    () => document.documentElement.scrollWidth,
  );
  expect(scrollWidth).toBeLessThanOrEqual(390);
});

test("dark mode is the default, whatever the system prefers", async ({
  page,
}) => {
  for (const colorScheme of ["light", "dark", "no-preference"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const background = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor,
    );
    expect(background, colorScheme).toBe("rgb(23, 23, 23)");
  }
});

test("the toggle opts into light mode and the choice persists", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const light = await page.evaluate(
    () => getComputedStyle(document.documentElement).backgroundColor,
  );
  expect(light).toBe("rgb(253, 253, 252)");

  // The choice survives navigation.
  await page.goto("/about/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(
    page.getByRole("button", { name: /switch to dark mode/i }),
  ).toBeVisible();

  await page.getByRole("button", { name: /switch to dark mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the logo is served as the site icon", async ({ page, request }) => {
  await page.goto("/");
  const icon = page.locator('link[rel="icon"]');
  await expect(icon).toHaveAttribute("href", /icon-32\.png\?v=[0-9a-f]{8}$/);

  for (const path of [
    "/icon-32.png",
    "/icon-180.png",
    "/icon-512.png",
    "/logo-256.png",
    "/logo-dark-256.png",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }

  // The favicon should stay small enough not to weigh on every page load.
  const favicon = await request.get("/icon-32.png");
  expect((await favicon.body()).byteLength).toBeLessThan(20_000);
});

test("the home logo follows the theme", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("img.home-logo--dark")).toBeVisible();
  await expect(page.locator("img.home-logo--light")).toBeHidden();

  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("img.home-logo--light")).toBeVisible();
  await expect(page.locator("img.home-logo--dark")).toBeHidden();
});
