const { TargetType } = require("../utils/enum");
const webdriver = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
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

  async getCurrentURL() {
    try {
      return (this.value = await driver.getCurrentUrl());
    } catch (e) {
      console.error(e);
    }
  }

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
      return (this.emailVerificationCode = matches[1]);
    } else {
      console.log("No matches found.");
    }
  }

  async getCodeValue(url) {
    const regex = /[?&]code=([^&]+)/;
    const match = url.match(regex);

    if (match) {
      const codeValue = match[1];
      return codeValue;
    } else {
      console.log("Code value not found on the URL");
    }
  }

  async generateBearerTokenValue(code) {
    const apiUrl = "http://localhost:2000/oauth/token";
    const data = {
      grant_type: "authorization_code",
      client_id: "application_client",
      redirect_uri: "http://localhost:2000/health",
      code: code,
      scope: "delegated:all",
    };
    const response = await axios.post(apiUrl, new URLSearchParams(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  }

  async getInviteCode(token) {
    const apiUrl = "http://localhost:2000/user/invite-codes";
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(apiUrl, { headers });
    return response.data.data.inviteCodes[0].code;
  }

  async getBearerTokenValue(test1) {
    const test = JSON.stringify(test1);
    const regex1 = /"access_token":"([0-9a-z]+)"/;
    const match1 = test.match(regex1);

    if (match1) {
      const accessToken = match1[1];
      return accessToken;
    } else {
      console.log("Access token not found");
      return null; // You might want to return a default value or handle this case differently.
    }
  }
}
module.exports = Core;
