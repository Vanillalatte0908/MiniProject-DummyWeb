# MiniProject-DummyWeb


📘 MiniProject-DummyWeb

Automation project using Playwright + Cucumber (BDD/Gherkin) for testing the Sauce Demo web application.
This project demonstrates end-to-end UI automation using feature files, step definitions, hooks, page objects, and reusable test utilities.

🚀 Tech Stack

Playwright (E2E automation)

Cucumber / Gherkin (BDD feature files)

TypeScript

Page Object Model (POM)

Sauce Demo Web App → https://www.saucedemo.com

🛠️ 1. Installation Guide

Follow these steps to set up and run the project:

🧩 Step 1 — Install Node.js

Make sure Node.js is installed:

node -v
npm -v


If not installed, download it from:
https://nodejs.org/

📦 Step 2 — Install Dependencies

Inside your project folder:

npm install


Then install Playwright with required browsers:

npx playwright install


Install Cucumber:

npm install @cucumber/cucumber --save-dev


(Optional) If you need dotenv:

npm install dotenv

🧪 2. Running the Tests
▶ Run all feature tests
npx cucumber-js

▶ Run a specific feature
npx cucumber-js features/addchart.feature

▶ Run with tag
npx cucumber-js --tags "@smoke"

📸 3. Screenshots

After execution, screenshots will be automatically saved to:

/reports/screenshots/<scenarioName>/