const { Given, When, Then} = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

Then('User wait for {int} seconds', async function(int) {
    await base.utils.wait(int)
  })