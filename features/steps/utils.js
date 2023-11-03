const { Given, When, Then} = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

Then('User wait for {int} seconds', async function(int) {
    await base.utils.wait(int)
  });

Then('Get the browser logs', async function() {
    await base.utils.getBrowserLogs()
});

Then('Get the verification code from the {string} docker container logs and place the value on the verify account page', async function (containerName) {
    await base.utils.getVerificationCode(containerName)
});