const Core = require("../utils/core");
const { exec } = require("child_process");
const path = require("path");
const currentDirectory = __dirname;
const parentDirectory = path.join(
  currentDirectory,
  "../../liquid/quickstart"
);

class Docker {
  dockerStop() {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const stopContainersCommand =
        "cd ${parentDirectory} && docker stop $(docker ps -aq)";

      // Execute the shell command
      exec(stopContainersCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }

        if (stderr) {
          reject();
          console.error(`Error output: ${stderr}`);
        }

        console.log(`Stopped Docker containers:\n${stdout}`);
        resolve();
      });
    });
  }

  dockerStart() {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const startContainersCommand =
        "cd ${parentDirectory} && docker start $(docker ps -aq)";

      // Execute the shell command
      exec(startContainersCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }

        if (stderr) {
          reject();
          console.error(`Error output: ${stderr}`);
        }

        console.log(`Started Docker containers:\n${stdout}`);
        resolve();
      });
    });
  }
}
module.exports = Docker;
