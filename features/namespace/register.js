const Core = require("../utils/core");
const { TargetType } = require("../utils/enum");

class Register {
    constructor() {
        this.core = new Core()
    }

    async clickCreateAccountLink() {
        await this.core.click(TargetType.xpath, "//span[@class='page-link']/a[text()='Create Account']")
    }
    async checkSignUpPageIsDispalyed(value) {
        await this.core.checkElementVisible(TargetType.xpath, "//h3[contains(text(),'Sign up')]")
    }
    
    async enterUsernameOnTheRegistrationPage(username) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='username']", username)
    }
    
    async enterFirstnameOnTheRegistrationPage(username) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='firstName']", username)
    }

    async enterLastnameOnTheRegistrationPage(username) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='lastName']", username)
    }

    async enterEmailOnTheRegistrationPage(username) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='email']", username)
    }

    async enterPasswordOnTheRegistrationPage(username) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='password']", username)
    }

    async clickCreateAccountButton() {
        await this.core.click(TargetType.xpath, "//input[@value='Create Account']")
    }
}
module.exports = Register