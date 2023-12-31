const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
var { setDefaultTimeout } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

When("User clicks on create account link", async function () {
    await base.register.clickCreateAccountLink()
});

When("Checks that user is landed on the {string} page", async function (string) {
    await base.register.checkSignUpPageIsDispalyed(string)
});

Then("Enters the {string} in username field on the registartion page", async function (username) {
    await base.register.enterUsernameOnTheRegistrationPage(username)
});

Then("Enters the {string} in firstname field on the registartion page", async function (username) {
    await base.register.enterFirstnameOnTheRegistrationPage(username)
});

Then("Enters the {string} in lastname field on the registartion page", async function (username) {
    await base.register.enterLastnameOnTheRegistrationPage(username)
});

Then("Enters the {string} in email field on the registartion page", async function (username) {
    await base.register.enterEmailOnTheRegistrationPage(username)
});

Then("Enters the {string} in password field on the registartion page", async function (username) {
    await base.register.enterPasswordOnTheRegistrationPage(username)
});

Then("Clicks the create account button", async function() {
    await base.register.clickCreateAccountButton()
});

Then("Checks that {string} error message is displayed", async function (errorMessage) {
    await base.register.checkErrorMessage(errorMessage)
});

Then("Checks that user redirected to login page", async function() {
    await base.register.checkRedirectToLoginPage()
});

Then("Enters the country code {string} and phone number {string} in phone number field on the registration page", async function (countryCode, phoneNumber) {
    await base.register.enterPhoneNumber(countryCode, phoneNumber)
});

Then("Checks that user redirected to verify account page", async function() {
    await base.register.enterVerifyCodePage()
});

Then("Clicks the verify account button", async function() {
    await base.register.clickVerifyButton()
});

Then("Clicks the submit account button", async function() {
    await base.register.clickSubmitButton()
});

Then("Clicks the forgot password link", async function() {
    await base.register.clickForgotPasswordLink()
});

Then("Enters the {string} email id on the forgot password page", async function(emailID) {
    await base.register.enterEmailOnThePasswordResetPage(emailID)
});

Then("Enters the {string} in password field on the reset password page", async function (username) {
    await base.register.enterPasswordOnTheResetPage(username)
});

Then("Clicks the change password button", async function () {
    await base.register.clickChangePassword()
});

Then("Checks that user redirected to verify your identity page", async function() {
    await base.register.verifyIdentityPage()
});

Then("Enters the inviteCode on the registartion page", async function () {
    let inviteCode = await base.utils.getInviteCode()
    await base.register.enterInviteCode(inviteCode)
});