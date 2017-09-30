const fs = require('fs-extra');
const exec    = require('child_process').exec;

const updatePackage = require('./updatePackage');


module.exports = function(packageJSON, callback = false) {
    var packagePath = process.cwd() + '/package.json';
    fs.readJson(packagePath, (err, packageObj) => {
        if (err) {
            exec(`npm init -y`, {cwd: process.cwd()}, function(error, stdout, stderr){
                if (error) {
                    console.log('Failed to create package.json!');
                    return false;
                }

                updatePackage(packageJSON);
            });
        } else {
            updatePackage(packageJSON);
        }
    });
};