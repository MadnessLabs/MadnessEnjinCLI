const fs      = require('fs');
var inquirer  = require('inquirer');
const nconf = require('nconf');

const tokenLogin = require('../services/tokenLogin');

module.exports = function(enjinDir) {
    const configFile = `${enjinDir}/enjin.json`;

    nconf.argv()
        .env()
        .file({ file: configFile });

    if (nconf.get('token')) {
        console.log('You are already logged in...');
    } else {
        var token = process.argv[3];
        if (!token) {
            console.log('Login at https://MadnessEnjin.net and go to your profile to copy your Secret Token.');
            inquirer.prompt([{
                "type": "input",
                "name": "token",
                "message": "Paste Secret Token Here"
            }], function(answers) {
                tokenLogin(enjinDir, answers.token);
            });
        } else {
            tokenLogin(enjinDir, token);
        }
    }
};