const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
const rimraf  = require('rimraf');

const cleanString = require('../services/cleanString');
const cloneRepo = require('../services/cloneRepo');
const appInstall = require('../services/appInstall');
const openEditor = require('../services/openEditor');
const updatePackage = require('../services/updatePackage');


module.exports = function(enjinDir) {
    var stack = process.argv[3];
    var name = process.argv[4];
    var editor = process.argv[5];

    if (!stack) {
        throw 'Stack name or repo link is required!';
    }

    if (!name) {
        throw 'App name is required to start your new project!';
    }

    var newAppName = cleanString(name);
    var appDir = process.cwd() + '/' + newAppName;
    
    cloneRepo(enjinDir, stack, newAppName, (err) => {
        if (err) {
            if (err.code === 128) {
                console.log(`An app with the name "${name}" already exists in the current directory!`);
            } else {
                console.log('An error occured while closing the repo!');
            }
            return false;
        }

        rimraf(appDir + '/.git/', (err) => {
            if (err) {
                console.log('Failed to remove .git history...');
            }
        });
        
        updatePackage({name: newAppName.toLowerCase()}, false, appDir);

        appInstall(appDir, (stdout) => {
            console.log(stdout);
            console.log('Your app has been installed successfully! ^_^');
            if (editor) {
                console.log('Now opening project in your selected editor...');
                openEditor(editor, appDir);
            }
        });
    });
};