var { After, Before, AfterAll, Status } = require("@cucumber/cucumber");
const { initDriver } = require("../utils/driverUtil");
var reporter = require('cucumber-html-reporter');
let driver;


Before(async function () {
  driver = await initDriver();
});

After(async function (scenario) {
  var world = this
  try {
    if (driver) {

      console.log("After")
      if (scenario.result.status === Status.FAILED) {
        console.log("Snapshot")
        return driver.takeScreenshot().then((png) => {
          // screenShot is a base-64 encoded PNG
          world.attach(png, 'image/png');
      });
      }
    await driver.quit();
    }
  } catch (error) {
    // Handle any errors that occur while quitting the driver
    console.error("Error while quitting the WebDriver:", error);
  }
});
