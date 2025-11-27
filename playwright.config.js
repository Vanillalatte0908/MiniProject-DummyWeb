// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['list'],                
    ['allure-playwright']    // ⭐ this generates allure-results folder
  ],

  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
