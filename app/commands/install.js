const exec    = require('child_process').exec;
const nconf   = require('nconf');
var inquirer  = require('inquirer');

const API = require('../services/API');
const cloneRepo = require('../services/cloneRepo');
const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var enjinProject = process.argv[3];
    const configFile = `${enjinDir}/enjin.json`;
    var projectFolder = process.argv[4];
    nconf.argv()
        .env()
        .file({ file: configFile });

    var currentUser = nconf.get('user');

    if (currentUser) {
        if (enjinProject) {
            cloneRepo(enjinDir, enjinProject, projectFolder);
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
                                console.log('Setting up connection to test server...');
                                projectFolder = answers.repo.split('/')[1];
                                var projectDir = process.cwd() + '/' + projectFolder;
                                exec(`git remote add test ssh://${currentUser.github_login}@104.131.212.234/var/repo/test/${appName(projectFolder)}`, {cwd: projectDir}, function(error, stdout, stderr){
                                    exec(`git push test master`, {cwd: projectDir}, function(error, stdout, stderr){
                                        console.log('Project setup and ready to deploy! ^_^');    
                                    });
                                });
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
        cloneRepo(enjinDir, enjinProject, projectFolder);
    }
};