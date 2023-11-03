const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class Utils {
  constructor() {
    this.core = new Core();
  }

  async wait(int) {
    await this.core.sleep(int)
  }

  async getBrowserLogs() {
    await this.core.getBrowserConsoleLogs()
  }

  async getVerificationCode(containerName) {
    let verifyCode = await this.core.getVerificationCodeFromLogs(containerName);
    await this.core.typeValue(TargetType.xpath, `//input[@id='code']`, verifyCode)
  }
}
module.exports = Utils