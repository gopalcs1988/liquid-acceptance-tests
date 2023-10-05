const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

Then('Check that the consent page is displayed', async function () {
    await base.consent.checkConsentPage()
  });

Then('Click on the consent button', async function() {
    await base.consent.clickConsent()
})