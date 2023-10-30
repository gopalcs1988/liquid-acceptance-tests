const { Given, When, Then} = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

 Given('Stop all the running docker containers', async function () {
   await base.docker.dockerStop();
 });

 Given('Start all the docker containers', async function () {
    await base.docker.dockerStart();
 });