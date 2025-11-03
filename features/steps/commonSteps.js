const { Given, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const fs = require('fs');
let browser, page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshotPath = `reports/screenshots/${Date.now()}-${scenario.pickle.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(fs.readFileSync(screenshotPath), 'image/png');
    console.log(`❌ Screenshot captured for failed scenario: ${screenshotPath}`);
  }
  await browser.close();
});

Given('I open the website {string}', async (url) => {
  await page.goto(url);
});

Then('I should see {string} in the title', async (expectedTitle) => {
  const title = await page.title();
  expect(title).toContain(expectedTitle);
});

// Wait for X seconds (only one definition)
Then('I wait for {int} seconds', async (seconds) => {
  await page.waitForTimeout(seconds * 1000);
  console.log(`⏱️ Waited for ${seconds} seconds`);
});


// Click by XPath
Then(/^I should click "(.*)"$/, async (xpath) => {
  const element = page.locator(`xpath=${xpath}`);
  await element.click();
  console.log(`🖱️ Clicked element: ${xpath}`);
});

// Type text into active element
Then(/^I should sendtext "(.*)"$/, async (text) => {
  await page.keyboard.type(text);
  console.log(`⌨️ Typed text: ${text}`);
});


Then('I should take screenshot', async function () {
  const screenshotPath = `reports/screenshots/${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  this.attach(fs.readFileSync(screenshotPath), 'image/png');
  console.log(`📸 Screenshot saved: ${screenshotPath}`);
}); 

//add chart
Then ('I add item to cart by id "(.*)"', async (itemId) => {
  const itemSelector = `#${itemId}`;
  await page.click(itemSelector);
  console.log(`🛒 Added item to cart: ${itemId}`);
});