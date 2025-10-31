const { Given, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser, page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

After(async () => {
  await browser.close();
});

Given('I open the website {string}', async (url) => {
  await page.goto(url);
});

Then('I should see {string} in the title', async (expectedTitle) => {
  const title = await page.title();
  expect(title).toContain(expectedTitle);
});
