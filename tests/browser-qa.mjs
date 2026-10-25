import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {}),
});
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (e) => errors.push(e.message));
const report = [];
await mkdir("qa-output", { recursive: true });
try {
  await page.goto("http://127.0.0.1:3000/en/", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toContainText("real products.");
  await expect(page.locator(".hero-visual canvas")).toHaveCount(1);
  const homeLinks = page.locator(".project-pitch .product-links a");
  await expect(homeLinks).toHaveCount(3);
  await expect(homeLinks.nth(1)).toHaveAttribute(
    "href",
    "https://apps.apple.com/us/app/tufootapp/id6783928340?l=fr-FR",
  );
  await expect(homeLinks.nth(2)).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.tufoot",
  );
  await expect(page.locator(".project-focus .focus-disc img")).toHaveAttribute(
    "src",
    "/images/projects/focum/logo.png",
  );
  await page.locator(".project-pitch").scrollIntoViewIfNeeded();
  await expect(
    page.locator(".project-pitch .product-phone img").first(),
  ).toBeVisible();
  await page.waitForFunction(() =>
    Array.from(
      document.querySelectorAll(".project-pitch .product-phone img"),
    ).every((img) => img.complete && img.naturalWidth > 0),
  );
  await page.locator(".project-focus").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const img = document.querySelector(".project-focus .focus-disc img");
    return img?.complete && img.naturalWidth > 0;
  });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "qa-output/desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.locator(".experience-item summary").first().click();
  await expect(page.locator(".experience-body").first()).toBeVisible();
  await page
    .getByRole("button", { name: "Software Development", exact: true })
    .click();
  await expect(page.locator("#skill-panel")).toContainText("TypeScript");
  await page.locator(".language").click();
  await page.waitForURL("**/es/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("h1")).toContainText("productos reales.");
  await page.locator(".project-copy h3 a").first().click();
  await page.waitForURL("**/es/projects/tufoot/");
  await expect(page.locator("h1")).toContainText("tuFoot");
  await expect(
    page.getByRole("link", { name: "Visitar tuFoot" }).first(),
  ).toHaveAttribute("href", "https://tufoot.com");
  await expect(page.locator(".detail-platforms .product-link")).toHaveCount(3);
  await expect(page.locator(".case-contributions article")).toHaveCount(3);
  await expect(page.locator(".product-phone img")).toHaveCount(3);
  await page.locator(".gallery-button").first().click();
  await expect(page.locator(".lightbox")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-controls .mono")).toContainText("2 / 5");
  await page.keyboard.press("Escape");
  await expect(page.locator(".lightbox")).not.toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "qa-output/tufoot-desktop.png",
    fullPage: true,
  });
  await page.locator(".language").click();
  await page.waitForURL("**/en/projects/tufoot/");
  for (const slug of [
    "tufoot",
    "focum",
    "thirld-world-invasion",
    "gaming-servers",
  ]) {
    const response = await page.goto(
      `http://127.0.0.1:3000/en/projects/${slug}/`,
    );
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("http://127.0.0.1:3000/en/");
  await page.locator("#contact-name").fill("Test & María");
  await page.locator("#contact-email").fill("test@example.com");
  await page
    .locator("#contact-message")
    .fill("An interesting idea for a thoughtful product.");
  await page.locator('.contact-form button[type="submit"]').click();
  await expect(page.locator(".form-status")).toContainText("email draft");
  report.push(
    "Desktop: WebGL, timeline, capabilities, locale routes, four project pages and honest mail fallback pass.",
  );
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("http://127.0.0.1:3000/en/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    expect(overflow, `Horizontal overflow at ${width}px`).toBe(false);
    if (width === 375) {
      await page.locator(".menu-toggle").click();
      await expect(page.locator(".navigation")).toBeVisible();
      await page.locator(".navigation a").first().click();
      await expect(page.locator(".menu-toggle")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      await page.evaluate(() => {
        document.activeElement?.blur();
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page.screenshot({ path: "qa-output/mobile.png", fullPage: true });
    }
    await page.goto("http://127.0.0.1:3000/es/projects/tufoot/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `Project overflow at ${width}px`,
    ).toBe(false);
    await expect(page.locator(".detail-platforms .product-link")).toHaveCount(
      3,
    );
    if (width === 375)
      await page.screenshot({
        path: "qa-output/tufoot-mobile.png",
        fullPage: true,
      });
    await page.goto("http://127.0.0.1:3000/es/projects/focum/");
    await expect(page.locator(".focus-disc img")).toHaveAttribute(
      "src",
      "/images/projects/focum/logo.png",
    );
    expect(
      await page
        .locator(".focus-disc img")
        .evaluate((img) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      `Focum overflow at ${width}px`,
    ).toBe(false);
  }
  report.push(
    "Responsive layouts: 375, 768, 1024 and 1440px without horizontal overflow; mobile menu passes.",
  );
  const reduced = await browser.newPage({
    reducedMotion: "reduce",
    viewport: { width: 375, height: 812 },
  });
  await reduced.goto("http://127.0.0.1:3000/es/");
  await expect(reduced.locator(".hero-visual canvas")).toHaveCount(0);
  await expect(reduced.locator(".core-fallback")).toBeVisible();
  await reduced.close();
  const missing = await page.goto("http://127.0.0.1:3000/not-a-real-page");
  expect(missing.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("hasn’t been built");
  expect(errors).toEqual([]);
  report.push("Reduced motion, 404 and browser runtime errors pass.");
  console.log(report.join("\n"));
} finally {
  await browser.close();
}
