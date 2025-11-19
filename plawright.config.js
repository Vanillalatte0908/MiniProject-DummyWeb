// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],                // optional: shows results in terminal
    ['allure-playwright']    // ⭐ THIS is the Allure reporter
  ],

  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
