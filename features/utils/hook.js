var { After, Before, AfterAll, Status } = require("@cucumber/cucumber");
const { initDriver } = require("../utils/driverUtil");
var reporter = require('cucumber-html-reporter');
const fs = require("fs");
const path = require("path");
var { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);
let driver;
const directory = path.join(__dirname, "../screenshots/");

Before(async function () {
  driver = await initDriver();
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
});

After(async function (scenario) {
  var world = this
  try {
    if (driver) {
      if (scenario.result.status === Status.FAILED) {
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