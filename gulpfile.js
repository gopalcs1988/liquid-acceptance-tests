var gulp = require('gulp')
var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: './features/reports/test.json',
    output: './features/reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    screenshotsDirectory: './features/screenshots/',
    storeScreenshots: true,
    failedSummaryReport: true
};
gulp.task('CucumberReports', function () {
    reporter.generate(options);
})