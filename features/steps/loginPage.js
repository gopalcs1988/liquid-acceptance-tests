const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
var { setDefaultTimeout } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

Given("Access the login page with the URL of {string}", async function (string) {
  console.log("The URL value is ", string);
  await base.login.LoginPage(string)
});

Given('Check that user is able to access the login page', async function () {
  await base.login.checkLoginPageIsLoaded()
});

When('Enter the username as {string}', async function (string) {
  await base.login.enterUserName(string)
});

When('Enter the password as {string}', async function (string) {
  await base.login.enterPassword(string)
});

When('Click on the login button', async function () {
  await base.login.clickLoginButton()
});
