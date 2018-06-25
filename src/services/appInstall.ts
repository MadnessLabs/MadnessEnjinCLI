import { exec } from "child_process";

/**
 * Runs npm install in a folder specified
 * @param folderPath The directory to run npm install in
 * @param callback A function that will run after install is complete
 */
export function appInstall(folderPath: string, callback: (output) => void) {
  console.log("Now installing ...");
  exec("npm install", { cwd: folderPath }, (error, stdout, stderr) => {
    if (error) {
      console.log("Failed to run npm install!");
      throw new Error(error.message);
    }
    if (!error && callback && typeof callback === "function") {
      callback(stdout);
    }
  });
}
