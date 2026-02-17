// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 1,
  workers: 1,

  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4173",
    viewport: { width: 375, height: 667 },
    isMobile: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});
