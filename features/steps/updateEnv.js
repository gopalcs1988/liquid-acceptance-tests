const { Given, When, Then } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

 Then('Update the environment variable {string} with value {string}', async function (variable, value) {
   await base.updateEnv.updateEnvVariable(variable, value);
 });

 Then('Update the redirectURI value on DB', async function() {
   await base.updateEnv.updateClient();
 });

