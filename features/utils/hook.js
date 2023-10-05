const { After, Before, AfterAll } = require("@cucumber/cucumber");
const { initDriver } = require("../utils/driverUtil");
var reporter = require('cucumber-html-reporter');
let driver;

Before(async function () {
  driver = await initDriver();
});

After(async function () {
  try {
    if (driver) {
      console.log("After")
      await driver.quit();
    }
  } catch (error) {
    // Handle any errors that occur while quitting the driver
    console.error("Error while quitting the WebDriver:", error);
  }
});
