const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

// Then('Check that agent is able to view the status as UP on the redirect page', async function () {
//   await base.login.checkHomePage();
// });