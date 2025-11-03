// tests/example.spec.js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const getStarted = page.getByRole('link', { name: 'Get started' });
  await expect(getStarted).toBeVisible();
});
