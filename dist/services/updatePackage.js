"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const merge = require("./merge");
function updatePackage(packageJSON, callback = false, packageDir = process.cwd()) {
    var packagePath = packageDir + "/package.json";
    fs.readJson(packagePath, (readError, currentPackage) => {
        if (readError) {
            throw new Error(readError.message);
        }
        fs.outputJson(packagePath, merge(currentPackage, packageJSON), { spaces: 4 }, error => {
            if (error) {
                console.log("There was an error updating your package.json file!");
                throw new Error(error.message);
            }
            if (callback && typeof callback === "function") {
                callback();
            }
            console.log("Package.json upadted!");
        });
    });
}
exports.updatePackage = updatePackage;
//# sourceMappingURL=updatePackage.js.map