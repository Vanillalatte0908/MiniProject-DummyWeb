module.exports = {
  default: {
    require: ['features/steps/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    paths: ['features/**/*.feature'],
    publishQuiet: true
  }
};