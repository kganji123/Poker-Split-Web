const { test, expect } = require("@playwright/test");
const { resetStorage, waitActive } = require("../_helpers");

test("Create league → dashboard active → localStorage saved", async ({ page }) => {
  await resetStorage(page);

  // Welcome screen
  await waitActive(page, "#screen-welcome");

  // Click Create Your League
  await page.getByRole("button", { name: /create your league/i }).click();
  await waitActive(page, "#screen-setup");

  // Fill league fields (based on Claude spec name=)
await page.fill('#lg-name', 'Test League');
await page.fill('#lg-buyin', '20');
await page.fill('#lg-chips', '1000');
await page.selectOption('#lg-format', 'cash'); // or 'tournament'

  // Add Family 1
  await page.getByRole("button", { name: /add family/i }).click();
  // If a modal appears, adapt here. Otherwise fields are on screen.
  await page.locator('input[name="familyName"]').fill("The Smiths");
  await page.locator('input[type="color"]').fill("#ff0000");
  await page.locator('input[name="member-0"]').fill("John Smith");
  await page.getByRole("button", { name: /save family/i }).click();

  // Add Family 2
  await page.getByRole("button", { name: /add another family|add family/i }).click();
  await page.locator('input[name="familyName"]').fill("The Jones");
  await page.locator('input[type="color"]').fill("#0000ff");
  await page.locator('input[name="member-0"]').fill("Jane Jones");
  await page.getByRole("button", { name: /save family/i }).click();

  // Create League
  await page.getByRole("button", { name: /create league/i }).click();
  await waitActive(page, "#screen-dashboard");

  // localStorage check
  const data = await page.evaluate(() => localStorage.getItem("pokersplit_league_v1"));
  expect(data).toBeTruthy();
  const parsed = JSON.parse(data);
  expect(parsed.league?.name).toBe("Test League");
  expect(parsed.families?.length).toBeGreaterThanOrEqual(2);
});
