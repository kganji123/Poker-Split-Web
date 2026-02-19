const { test, expect } = require('@playwright/test');

test.describe('PokerSplit - Demo & Navigation', () => {
  test('Load demo league and verify dashboard tabs + header links', async ({ page }) => {
    await page.goto('/');

    // Welcome screen
    await expect(page.getByRole('heading', { name: /Track\./i })).toBeVisible();

    // Load demo
    await page.getByRole('button', { name: /View Demo League/i }).click();

    // Dashboard should appear
    await expect(page.locator('#dash-name')).toHaveText(/Friday Night Showdown/i);

    // Verify tabs exist and switch
    await page.getByText('Families', { exact: true }).click();
    await expect(page.locator('#dash-content')).toContainText('The Martins');

    await page.getByText('Sessions', { exact: true }).click();
    await expect(page.locator('#dash-content')).toContainText('Start New Session');

    await page.getByText('Stats', { exact: true }).click();
    await expect(page.locator('#dash-content')).toContainText('Top Players');

    // Header links should navigate (full pages)
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page).toHaveURL(/hand-history\.html/i);

    await page.goto('/');
    await page.getByRole('button', { name: /View Demo League/i }).click();

    await page.getByRole('link', { name: 'Hands' }).click();
    await expect(page).toHaveURL(/poker-hands\.html/i);
  });

  test('Demo persists into localStorage after reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /View Demo League/i }).click();

    await expect(page.locator('#dash-name')).toHaveText(/Friday Night Showdown/i);

    await page.reload();

    // It should restore state and land back on dashboard
    await expect(page.locator('#dash-name')).toHaveText(/Friday Night Showdown/i);

    // Confirm localStorage key exists
    const hasState = await page.evaluate(() => !!localStorage.getItem('pokersplit_state_v1'));
    expect(hasState).toBeTruthy();
  });
});
