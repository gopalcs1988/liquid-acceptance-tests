const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class Utils {
  constructor() {
    this.core = new Core();
  }

  async wait(int) {
    await this.core.sleep(int)
  }
}
module.exports = Utils