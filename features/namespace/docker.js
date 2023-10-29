const Core = require("../utils/core");
const { exec } = require("child_process");
const path = require("path");
const currentDirectory = __dirname;
const parentDirectory = path.join(currentDirectory, "../../../../Liquid/liquid-docker");

class Docker {
  constructor() {
    this.core = new Core();
  }

  async dockerStop() {
    // Define the shell command to stop all Docker containers
    const stopContainersCommand =
      "cd ${parentDirectory} && docker stop $(docker ps -aq)";

    // Execute the shell command
    exec(stopContainersCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping Docker containers: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error output: ${stderr}`);
      }

      console.log(`Stopped Docker containers:\n${stdout}`);
    });
  }

  async dockerStart() {
    // Define the shell command to stop all Docker containers
    const stopContainersCommand =
      "cd ${parentDirectory} && docker compose up -d";

    // Execute the shell command
    exec(stopContainersCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting Docker containers: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error output: ${stderr}`);
      }

      console.log(`Started Docker containers:\n${stdout}`);
    });
  }
}
module.exports = Docker;
