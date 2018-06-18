"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const merge = require('./merge');
function default_1(packageJSON, callback = false, packageDir = process.cwd()) {
    var packagePath = packageDir + '/package.json';
    fs.readJson(packagePath, (err, currentPackage) => {
        fs.outputJson(packagePath, merge(currentPackage, packageJSON), { spaces: 4 }, (err) => {
            if (err) {
                console.log('There was an error updating your package.json file!');
                return false;
            }
            if (callback && typeof callback === 'function') {
                callback();
            }
            console.log('Package.json upadted!');
        });
    });
}
exports.default = default_1;
;
//# sourceMappingURL=updatePackage.js.map