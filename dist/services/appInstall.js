"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function default_1(folderPath, callback) {
    console.log('Now installing ...');
    child_process_1.exec('npm install', { cwd: folderPath }, (error, stdout, stderr) => {
        if (error) {
            console.log('Failed to run npm install!');
            return false;
        }
        if (!error && callback && typeof callback === 'function') {
            callback(stdout);
            return true;
        }
    });
}
exports.default = default_1;
;
//# sourceMappingURL=appInstall.js.map