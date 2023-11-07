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

  async getInviteCode() {
    //let url = await this.core.getCurrentURL()
    //let code = await this.core.getCodeValue(url)
    let bearerToken = await this.core.generateBearerTokenValue(global.code)
    let accessToken = await this.core.getBearerTokenValue(bearerToken)
    let inviteCode = await this.core.getInviteCode(accessToken)
    return inviteCode
  }
}
module.exports = Utils