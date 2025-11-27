module.exports = {
  default: {
    require: ['features/steps/**/*.js'],   // ✅ correct relative path
    format: [
      'progress',
      'allure-report',
      'allure-results:reports/allure-results',
      'json:reports/cucumber_report.json',
      'html:reports/cucumber-report.html'
    ],
    paths: ['features/**/*.feature'],       // ✅ automatically includes all features
    publishQuiet: true
  }
};
