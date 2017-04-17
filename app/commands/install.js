const exec    = require('child_process').exec;
const nconf   = require('nconf');
var inquirer  = require('inquirer');

const API = require('../services/API');
const cloneRepo = require('../services/cloneRepo');


module.exports = function(enjinDir) {
    var enjinProject = process.argv[3];
    const configFile = `${enjinDir}/enjin.json`;
    nconf.argv()
        .env()
        .file({ file: configFile });

    var currentUser = nconf.get('user');

    if (currentUser) {
        if (enjinProject) {
            cloneRepo(enjinDir, enjinProject, process.argv[4]);
        } else {
            new API('get', 'project', {}, (data) => {
                var choices = [];
                data.forEach(function(project, index) {
                    choices.push({
                        name: project.name,
                        value: project.github
                    });
                    if (index === data.length - 1) {
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'repo',
                                message: 'Which project you would like to install?',
                                choices: choices
                            }
                        ], (answers) => {
                            cloneRepo(enjinDir, `${currentUser.github_login}:${currentUser.github_token}@${answers.repo}`, false, () => {
                                // Setup Pushing to MadnessEnjin.net Test Server
                            });
                        });
                    }
                });
            });
        }
    } else {
        if (!enjinProject) {
            console.log('Github repo link required...');
            return false;
        }
        cloneRepo(enjinDir, enjinProject, process.argv[4]);
    }
};