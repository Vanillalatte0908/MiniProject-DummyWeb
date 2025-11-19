import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForTimeout(5000); 
  await page.screenshot({ path: 'login-success.png' });
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.waitForTimeout(5000); 
  await page.screenshot({ path: 'menu-opened.png' });
  await page.getByRole('button', { name: 'Close Menu' }).click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'item-added.png' });
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'cart-view.png' });
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.waitForTimeout(5000); 
  await page.screenshot({ path: 'item-removed.png' });
  await page.locator('[data-test="continue-shopping"]').click();
});