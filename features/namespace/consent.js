const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class Consent {
    constructor() {
        this.core = new Core()
    }

    async checkConsentPage () {
        await this.core.checkElementVisible(TargetType.xpath, "//div[@class='noselect']//h3[contains(text(),'Consent Required')]")
    }

    async clickConsent() {
        await this.core.click(TargetType.xpath, "//input[@class='button' and @value='Consent']")
        //await driver.sleep(10000)
    }
}
module.exports = Consent