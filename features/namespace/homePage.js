const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class HomePage {
  constructor() {
    this.core = new Core();
  }

  async checkHomePage(value) {
    await this.core.checkElementVisible(
      TargetType.xpath,
      `//div[@class='cm-scroller']//span[contains(text(),'${value}')]`
    );
  }
}
module.exports = HomePage
