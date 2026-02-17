async function resetStorage(page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("pokersplit_league_v1");
  });
  await page.reload();
}

async function waitActive(page, screenId) {
  await page.waitForSelector(`${screenId}.active`, { timeout: 10_000 });
}

module.exports = { resetStorage, waitActive };
