import { test, expect } from '@playwright/test';

// ⭐ Reusable function to add/remove an item
async function handleItem(page, item) {
  const add = page.locator(`[data-test="add-to-cart-${item}"]`);
  const remove = page.locator(`[data-test="remove-${item}"]`);

  // If the remove button is visible → item is already added
  if (await remove.isVisible()) {
    console.log(`${item}: already in cart → removing it.`);
    await remove.click();
    await page.screenshot({ path: `${item}-removed.png` });

  // If the add button is visible → item is not yet added
  } else if (await add.isVisible()) {
    console.log(`${item}: not in cart → adding it.`);
    await add.click();
    await page.screenshot({ path: `${item}-added.png` });

  } else {
    console.log(`${item}: No add/remove buttons found.`);
  }
}

test('upgraded test with reusable logic', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.waitForTimeout(1500);
  const menuButton = page.getByRole('button', { name: 'Open Menu' });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await handleItem(page, "sauce-labs-backpack");
  await handleItem(page, "sauce-labs-bike-light");
  await handleItem(page, "sauce-labs-bolt-t-shirt");
  await handleItem(page, "sauce-labs-fleece-jacket");
  await handleItem(page, "sauce-labs-onesie");
  await handleItem(page, "test.allthethings()-t-shirt-(red)");
  await page.waitForTimeout(1000);
  await page.locator('[data-test="shopping-cart-link"]').click();
});
