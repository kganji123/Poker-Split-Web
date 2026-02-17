const { test, expect } = require("@playwright/test");
const { resetStorage } = require("../_helpers");

test("Demo data loads + navigation works across pages", async ({ page }) => {
  await resetStorage(page);

  await page.goto("/");

  // Load demo data if available
  await page.evaluate(() => {
    if (typeof loadDemoData !== "function") throw new Error("loadDemoData() not found");
    loadDemoData();
  });

  const data = await page.evaluate(() => localStorage.getItem("pokersplit_league_v1"));
  expect(data).toBeTruthy();

  // Navigate via bottom nav links
  await page.click('a[href="hand-history.html"]');
  await page.waitForURL("**/hand-history.html");
  await expect(page.locator("body")).toBeVisible();

  await page.click('a[href="leaderboard.html"]');
  await page.waitForURL("**/leaderboard.html");
  await expect(page.locator("body")).toBeVisible();

  await page.click('a[href="settlement.html"]');
  await page.waitForURL("**/settlement.html");
  await expect(page.locator("body")).toBeVisible();
});
