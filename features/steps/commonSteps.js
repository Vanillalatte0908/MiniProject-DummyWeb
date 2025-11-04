const { BeforeAll, Before,AfterAll, Given, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

let browser, page;

BeforeAll(async () => {
  console.log('🚀 Launching browser once...');
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  console.log('✅ Logged in successfully!');
});

// --- Capture each scenario name
Before(function (scenario) {
  scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
  console.log(`🎯 Running scenario: ${scenarioName}`);
});

AfterAll(async () => {
  console.log('🧹 Closing browser...');
  await browser.close();
});

Given('I open the website {string}', async (url) => {
  await page.goto(url);
});
Then(/^I should click\s+["']?(.+?)["']?$/, async (selector) => {
  const element = page.locator(selector);
  if (await element.count() === 0)
    throw new Error(`❌ Element not found: ${selector}`);
  await element.first().click();
});

Then('I should sendtext {string}', async (text) => {
  await page.keyboard.type(text);
});

Then('I should take screenshot', async function () {
  const dir = path.join('reports', 'screenshots', scenarioName);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${Date.now()}.png`);
  await page.screenshot({ path: filePath });
  console.log(`📸 Screenshot saved: ${filePath}`);
  this.attach(fs.readFileSync(filePath), 'image/png');
});

Then('I should add item {string} if not added already', async (itemName) => {
  const addButton = page.locator(`#add-to-cart-sauce-labs-${itemName}`);
  const removeButton = page.locator(`#remove-sauce-labs-${itemName}`);

  if (await removeButton.count() > 0) {
    console.log(`🟡 ${itemName} already in cart, skipping add.`);
  } else {
    await addButton.click();
    console.log(`✅ ${itemName} added to cart.`);
  }
});

Then('I should remove item {string} if not added already', async (itemName) => {
  const removeButton = page.locator(`#remove-sauce-labs-${itemName}`);
  if (await removeButton.count() > 0) {
    await removeButton.click();
    console.log(`🗑️ Removed ${itemName} from cart.`);
  } else {
    console.log(`🟡 ${itemName} not in cart, skipping remove.`);
  }
});
