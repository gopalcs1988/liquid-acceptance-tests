const { TargetType } = require("../utils/enum");
const webdriver = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");
const DEFAULT_TIMEOUT = 15000;
const currentDirectory = __dirname;

class Core {
  
  async setLocator(targetType, target) {
    let by;
    switch (targetType) {
      case TargetType.xpath:
        by = webdriver.By.xpath(target);
        break;
      case TargetType.id:
        by = webdriver.By.id(target);
        break;
      case TargetType.class:
        by = webdriver.By.className(target);
        break;
      case TargetType.name:
        by = webdriver.By.name(target);
        break;
      case TargetType.css:
        by = webdriver.By.css(target);
        break;
      default:
        var error = { message: "Invalid Target" };
        throw error;
    }
    return by;
  }

  async openUrl(url) {
    await driver.get(url);
  }

  async typeValue(targetType, target, value, timeOut = DEFAULT_TIMEOUT) {
    try {
      await this.checkElementVisible(targetType, target, timeOut);
      await this.checkElementEnabled(targetType, target, timeOut);
      let locator = await this.setLocator(targetType, target);
      await driver.wait(webdriver.until.elementLocated(locator), timeOut);
      let element = await driver.findElement(locator);
      await element.clear();
      await element.click();
      await element.sendKeys(value);
    } catch (error) {
      console.error(
        "Error when trying to enter the value on the placeholder",
        error
      );
      throw error;
    }
  }

  async checkElementVisible(targetType, target, timeOut = DEFAULT_TIMEOUT) {
    try {
      let locator = await this.setLocator(targetType, target);
      await driver.wait(webdriver.until.elementLocated(locator), timeOut);
      let el = await driver.findElement(locator);
      await driver.wait(webdriver.until.elementIsVisible(el), timeOut);
    } catch (error) {
      console.error("Expected element is not present on the DOM", error);
      throw error;
    }
  }

  async checkElementEnabled(targetType, target, timeOut = DEFAULT_TIMEOUT) {
    try {
      let locator = await this.setLocator(targetType, target);
      await driver.wait(webdriver.until.elementLocated(locator), timeOut);
      let el = await driver.findElement(locator);
      await driver.wait(webdriver.until.elementIsEnabled(el), timeOut);
    } catch (error) {
      console.error("Expected element is not enabled on the DOM", error);
      throw error;
    }
  }

  async click(targetType, target, timeOut = DEFAULT_TIMEOUT) {
    try {
      await this.checkElementVisible(targetType, target, timeOut);
      await this.checkElementEnabled(targetType, target, timeOut);
      let locator = await this.setLocator(targetType, target);
      await driver.findElement(locator).click();
    } catch (e) {
      console.error(e);
      throw error;
    }
  }

  //  sleep = async (duration) => {
  //   console.log("Duration", duration)
  //   await new Promise(resolve => setTimeout(resolve, duration * 1000));
  //  }

  async sleep(s) {
    try {
      await driver.sleep(s * 1000);
    } catch (e) {
      console.error(e);
    }
  }

  async getBrowserConsoleLogs() {
    try {
      const logs = await driver.manage().logs().get("browser");
      const browserLogs = logs.map(
        (log) => `${log.level.value} - ${log.message}`
      );
      console.log(browserLogs);
    } catch (e) {
      console.error(e);
    }
  }

  async getVerificationCodeFromLogs(containerName) {
    const parentDirectory = path.join(
      currentDirectory,
      `../../${containerName}.txt`
    );
    const regexPattern = /verification code: ([\w-]+)/;

    // Specify the path to the text file
    const filePath = parentDirectory; // Replace with the actual file path

    // Read the file
    const data = fs.readFileSync(filePath, "utf8");

    // Use the regular expression to find matches
    const matches = data.match(regexPattern);

    if (matches) {
      // Output the matched values
      console.log("Matches found:");
      console.log(matches[1]);
      return this.emailVerificationCode = matches[1];
    } else {
      console.log("No matches found.");
    }
  }
}
module.exports = Core;
