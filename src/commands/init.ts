const inquirer  = require('inquirer');

const checkForEnjin = require('../services/checkForEnjin.js');
const createEnjinFromPackage = require('../services/createEnjinFromPackage');
const createEnjinFromPrompts = require('../services/createEnjinFromPrompts');

module.exports = function(enjinDir) {
    checkForEnjin((exists) => {
        if (exists) {
            console.log('You already have an enjin.json file in the current directory!');
            return false;
        }
        
        var createWith = process.argv[3];
        if (createWith === 'package') {
            console.log('Creating enjin.json from package.json file...');
            createEnjinFromPackage();
        } else if (createWith === 'prompts') {
            createEnjinFromPrompts();
        } else {
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'There isn\'t an enjin.json file in the current directory. Would you like to make one?',
                    name: 'enjin',
                    choices: ['Use package.json', 'Setup with prompts', 'Cancel'],
                    default: 0
                }
            ], (create) => {
                if (create.enjin === 'Cancel') {
                    return false;
                }

                if (create.enjin === 'Use package.json') {
                    createEnjinFromPackage();
                } else if (create.enjin === 'Setup with prompts') {
                    createEnjinFromPrompts();
                }
            });
        }
    });
};