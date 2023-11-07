const { Given, When, Then} = require("@cucumber/cucumber");
const base =  new (require("../namespace/base"));

 Given('Stop all the running docker containers', async function () {
   await base.docker.dockerStop();
 });

 Given('Start all the docker containers', async function () {
    await base.docker.dockerStart();
 });

 Then('Get {string} docker container logs', async function (containerName) {
  await base.docker.getDockerLogs(containerName);
 });

 Then('Stop the {string} container', async function (containerName) {
  await base.docker.dockerStopContainer(containerName)
 });

 Then('Start the {string} container', async function (containerName) {
  await base.docker.dockerStartContainer(containerName)
 });