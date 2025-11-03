const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  screenshotsDirectory: 'reports/screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App": "Saucedemo",
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

// Ensure screenshot directory exists
if (!fs.existsSync('reports/screenshots')) {
  fs.mkdirSync('reports/screenshots', { recursive: true });
}

reporter.generate(options);
