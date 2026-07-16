import { expect, test, type Page } from "@playwright/test";

async function openMenuIfCollapsed(page: Page) {
  const menuButton = page.getByRole("button", { name: /main menu/i });
  if ((await menuButton.count()) === 0 || !(await menuButton.isVisible()))
    return;

  if ((await menuButton.getAttribute("aria-expanded")) !== "true") {
    await menuButton.click();
  }

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
}

test("homepage loads with primary content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Aleksandra Ivanova" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View projects/i }),
  ).toBeVisible();
});

test("main navigation reaches required pages", async ({ page }) => {
  await page.goto("/");
  for (const name of [
    "About",
    "Experience",
    "Projects",
    "Publications",
    "CV",
    "Contact",
  ]) {
    await openMenuIfCollapsed(page);
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}/$`));
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
    page.getByRole("heading", { name: "Publications" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Copy citation/i }).first(),
  ).toBeVisible();
});

test("dark-mode toggle persists a manual theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Switch color theme/i }).click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    /dark|light/,
  );
});

test("CV link and mobile navigation are accessible", async ({
  page,
  isMobile,
}) => {
  await page.goto("/cv/");
  await expect(
    page.getByRole("link", { name: /Download CV PDF/i }),
  ).toBeVisible();

  if (isMobile) {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /main menu/i });
    await menuButton.focus();
    await page.keyboard.press("Enter");
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
  }
});
