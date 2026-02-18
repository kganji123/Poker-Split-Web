const { test, expect } = require('@playwright/test');

async function addFamily(page, familyName, membersCsv) {
  await page.getByText('+ Add Family').click();
  await expect(page.locator('#modal-family')).toHaveClass(/show/);

  await page.locator('#mf-name').fill(familyName);
  await page.locator('#mf-members').fill(membersCsv);

  await page.getByRole('button', { name: /^Add Family$/ }).click();
  await expect(page.locator('#modal-family')).not.toHaveClass(/show/);

  // Ensure it shows up in families list
  await expect(page.locator('#families-list')).toContainText(familyName);
}

test.describe('PokerSplit - Create League Flow', () => {
  test('Create a league with 2 families and reach dashboard', async ({ page }) => {
    await page.goto('/');

    // Go to setup
    await page.getByRole('button', { name: /Create Your League/i }).click();
    await expect(page.locator('#screen-setup')).toHaveClass(/active/);

    // Fill league fields (your actual IDs)
    await page.locator('#lg-name').fill('Test League');
    await page.locator('#lg-buyin').fill('20');
    await page.locator('#lg-chips').fill('1000');
    await page.locator('#lg-format').selectOption('cash');

    // Add 2 families (modal-based in your HTML)
    await addFamily(page, 'The Smiths', 'John, Jane');
    await addFamily(page, 'The Patels', 'Raj, Priya');

    // Create league
    await page.getByRole('button', { name: /Create League/i }).click();

    // Dashboard
    await expect(page.locator('#screen-dashboard')).toHaveClass(/active/);
    await expect(page.locator('#dash-name')).toHaveText('Test League');
    await expect(page.locator('#dash-sub')).toContainText('2 families');

    // Families tab should list new families
await page.locator('#dtab-families').click();
    await expect(page.locator('#dash-content')).toContainText('The Smiths');
    await expect(page.locator('#dash-content')).toContainText('The Patels');
  });

  test('Validation: cannot create league without 2 families', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Create Your League/i }).click();

    await page.locator('#lg-name').fill('Invalid League');
    await page.getByRole('button', { name: /Create League/i }).click();

    // Expect still on setup screen (toast message happens too but we keep it stable)
    await expect(page.locator('#screen-setup')).toHaveClass(/active/);
  });
});
