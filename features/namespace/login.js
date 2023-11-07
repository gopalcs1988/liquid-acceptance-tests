const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class Login {
    constructor() {
        this.core = new Core()
    }
    async loginPage(url) {
        await this.core.openUrl(url)
    }

    async searchText(value) {
        await this.core.typeValue(TargetType.xpath, "//*[@id='APjFqb']", value)
    }

    async checkLoginPageIsLoaded() {
        await this.core.checkElementVisible(TargetType.xpath, "*//div[@class='noselect']/h3[contains(text(),'Login to')]")
    }

    async enterUserName(value) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='username']", value)
    }

    async enterPassword(value) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='password']", value)
    }

    async clickLoginButton() {
        await this.core.click(TargetType.xpath, "//input[@class='button' and @value='Login']")
    }

    async getCodeValueFromURL() {
        let url = await this.core.getCurrentURL()
        global.code = await this.core.getCodeValue(url)
    }
}
module.exports = Login