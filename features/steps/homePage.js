const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

 Then('Check that agent is able to view the status as {string} on the redirect page', async function (string) {
   await base.homePage.checkHomePage(string);
 });