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
    
    async enterFirstnameOnTheRegistrationPage(firstName) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='firstName']", firstName)
    }

    async enterLastnameOnTheRegistrationPage(lastName) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='lastName']", lastName)
    }

    async enterEmailOnTheRegistrationPage(email) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='email']", email)
    }

    async enterPasswordOnTheRegistrationPage(password) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='password']", password)
    }

    async enterPasswordOnTheResetPage(password) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='password']", password)
    }

    async clickCreateAccountButton() {
        await this.core.click(TargetType.xpath, "//input[@value='Create Account']")
    }

    async checkErrorMessage(errorMessage) {
        await this.core.checkElementVisible(TargetType.xpath, `//input[@value='${errorMessage}']`)
    }

    async checkRedirectToLoginPage() {
        await this.core.checkElementVisible(TargetType.xpath, `//h3[contains(text(),'Login to')]`)
    }

    async enterPhoneNumber(countryCode, phoneNumber) {
        await this.core.click(TargetType.xpath, `//select[@id='phoneCountryCode']`)
        await this.core.click(TargetType.xpath, `//select[@id='phoneCountryCode']//option[@value='${countryCode}']`)
        await this.core.typeValue(TargetType.xpath, "//input[@id='phone']", phoneNumber)
    }

    async enterVerifyCodePage() {
        await this.core.checkElementVisible(TargetType.xpath, `//input[@id='code' and @placeholder='Your Verification Code']`)
    }

    async clickVerifyButton() {
        await this.core.click(TargetType.xpath, `//input[@value='Verify']`)
    }

    async clickForgotPasswordLink() {
        await this.core.click(TargetType.xpath, `//a[text()='Forgot Password?']`)
    }

    async enterEmailOnThePasswordResetPage(emailID) {
        await this.core.typeValue(TargetType.xpath, "//input[@id='email']", emailID)
        await this.core.click(TargetType.xpath, `//input[@value='Get Code']`)
    }

    async clickChangePassword() {
        await this.core.click(TargetType.xpath, `//input[@value='Change Password']`)
    }

    async verifyIdentityPage() {
        await this.core.checkElementVisible(TargetType.xpath, `//input[@id='email']`)
    }
}
module.exports = Register