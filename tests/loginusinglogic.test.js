import { test, expect } from '@playwright/test';

test('test with logic', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.waitForTimeout(5000);

  // ⭐ Logic: Check if menu button exists before clicking
  if (await page.getByRole('button', { name: 'Open Menu' }).isVisible()) {
    await page.getByRole('button', { name: 'Open Menu' }).click();
  } else {
    console.log('Menu button is not visible.');
  }

  // ⭐ Logic: Check if item is already in cart
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const addbutton1 = page.locator ('[data-test="add-to-cart-sauce-labs-bike-light"]');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');


  if (await addButton.isVisible()) {
    console.log("Item is NOT in cart, adding it...");
    await page.takeScreenshot({ path: 'item-added.png' });
    await addButton.click();
  } else if (await addbutton1.isVisible()) {
    console.log("Item is NOT in cart, adding it...");
    await page.takeScreenshot({ path: 'item-added.png' });
    await addbutton1.click();
  }else if (await removeButton.isVisible()) {
    console.log("Item is already in cart, skipping add.");
    await page.takeScreenshot({ path: 'item-already-in-cart.png' });
    await removeButton.click();
  }
  await page.waitForTimeout(5000);
  await page.locator('[data-test="shopping-cart-link"]').click();
});
