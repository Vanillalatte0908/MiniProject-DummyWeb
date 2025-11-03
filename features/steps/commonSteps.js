const { Before, After, Given, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

let browser, page, scenarioName;

Before(async function (scenario) {
  scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
  browser = await chromium.launch({ headless: false }); // change to true in CI
  const context = await browser.newContext();
  page = await context.newPage();

  // Auto login
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

After(async () => {
  await browser.close();
});

Given('I open the website {string}', async (url) => {
  await page.goto(url);
});

Then('I should see {string} in the title', async (expected) => {
  const title = await page.title();
  if (!title.includes(expected)) throw new Error(`Title mismatch: ${title}`);
});

/**
 * Flexible click step:
 * Works with both CSS (#id, .class) and XPath (//*[@id='something'])
 * Accepts either single or double quotes
 */
Then(/^I should click\s+["']?(.+?)["']?$/, async (selector) => {
  const element = page.locator(selector);
  if (await element.count() === 0) throw new Error(`Element not found: ${selector}`);
  await element.first().click();
});

Then('I should sendtext {string}', async (text) => {
  await page.keyboard.type(text);
});

Then(/^I should take\s*screenshot$/, async function () {
  const dir = path.join('reports', 'screenshots', scenarioName);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${Date.now()}.png`);
  await page.screenshot({ path: filePath });
  this.attach(fs.readFileSync(filePath), 'image/png'); // Attach to JSON report for embedding
});
