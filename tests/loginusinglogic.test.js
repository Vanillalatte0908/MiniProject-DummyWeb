import { test, expect } from '@playwright/test';

test('test with logic', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForTimeout(2000);
  
  const menuButton = page.getByRole('button', { name: 'Open Menu' });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  } else {
    console.log('Menu button is not visible.');
  }
  const addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  const removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
  const removeBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');

  if (await removeBackpack.isVisible()) {
    console.log("Backpack already in cart → removing it.");
    await removeBackpack.click();
    await page.screenshot({ path: 'screenshots/backpack-removed.png' });

  } else if (await removeBikeLight.isVisible()) {
    console.log("Bike light already in cart → removing it.");
    await removeBikeLight.click();
    await page.screenshot({ path: 'screenshots/bikelight-removed.png' });

  } else if (await addBackpack.isVisible()) {
    console.log("Backpack NOT in cart → adding it.");
    await addBackpack.click();
    await page.screenshot({ path: 'screenshots/backpack-added.png' });

  } else if (await addBikeLight.isVisible()) {
    console.log("Bike light NOT in cart → adding it.");
    await addBikeLight.click();
    await page.screenshot({ path: 'screenshots/bikelight-added.png' });

  } else {
    console.log("No add/remove buttons found for items.");
  }

  await page.waitForTimeout(1500);
  await page.locator('[data-test="shopping-cart-link"]').click();

});
