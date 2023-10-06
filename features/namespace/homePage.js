const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class HomePage {
  constructor() {
    this.core = new Core();
  }

  async checkHomePage() {
    await this.core.checkElementVisible(TargetType.xpath,"//*[contains(text(),'UP')]")
  }
}
module.exports = HomePage
