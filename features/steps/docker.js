const { Given, When, Then, AfterAll, Before } = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

 Then('Stop all the running docker containers', async function () {
   await base.docker.dockerStop();
 });

 Then('Start all the docker containers', async function () {
    await base.docker.dockerStart();
  });