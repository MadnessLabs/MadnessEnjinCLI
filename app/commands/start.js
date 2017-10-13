const exec = require('child_process').exec;
const _ = require('lodash');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const argv = require('yargs').argv;

const cleanString = require('../services/cleanString');
const cloneRepo = require('../services/cloneRepo');
const appInstall = require('../services/appInstall');
const openEditor = require('../services/openEditor');
const updatePackage = require('../services/updatePackage');
const expandGitLink = require('../services/expandGitLink');


module.exports = function(enjinDir) {
    var stack = process.argv[3];
    var name = process.argv[4];
    var editor = argv.editor ? argv.editor : argv.e;
    var repo = argv.repo ? argv.repo : argv.r;

    if (!stack) {
        throw 'Stack name or repo link is required!';
    }

    if (!name) {
        throw 'App name is required to start your new project!';
    }

    if (repo) {
        repo = expandGitLink(repo);
    }

    var newAppName = cleanString(name);
    var appDir = process.cwd() + '/' + newAppName;
    
    cloneRepo(enjinDir, stack, newAppName, (err) => {
        if (err) {
            console.log(err);
            return false;
        }

        exec(`git remote rm origin`, {cwd: appDir}, function(error, stdout, stderr){
            if (error) {
                console.log('Failed to remove .git origin remote!');
            } else if (repo) {
                exec(`git remote add origin ${repo}`, {cwd: appDir}, function(error, stdout, stderr){
                    if (error) {
                        console.log(`Failed to add ${repo} origin remote!`);
                    } else {
                        console.log(`Added ${repo} as origin remote...`);
                    }
                });
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