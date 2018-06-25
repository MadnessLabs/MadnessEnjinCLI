"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Runs npm install in a folder specified
 * @param folderPath The directory to run npm install in
 * @param callback A function that will run after install is complete
 */
function appInstall(folderPath, callback) {
    console.log("Now installing ...");
    child_process_1.exec("npm install", { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.log("Failed to run npm install!");
            throw new Error(error.message);
        }
        if (!error && callback && typeof callback === "function") {
            callback(stdout);
        }
    });
}
exports.appInstall = appInstall;
//# sourceMappingURL=appInstall.js.map