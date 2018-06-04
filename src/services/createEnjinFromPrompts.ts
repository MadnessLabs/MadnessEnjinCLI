const inquirer  = require('inquirer');
const path = require('path');

const createEnjin = require('./createEnjin');
const createOrUpdatePackage = require('./createOrUpdatePackage');
const cleanString = require('./cleanString');


module.exports = function(callback = false) {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of your app?',
            name: 'name',
            default: process.cwd().split(path.sep).pop()
        }, {
            type: 'input',
            message: 'What is the app version?',
            name: 'version',
            default: '0.0.1'
        }, {
            type: 'input',
            message: 'How would you describe your app?',
            name: 'description'
        }, {
            type: 'input',
            message: 'Who is the author of the app?',
            name: 'author'
        }, {
            type: 'confirm',
            message: 'Do you want to update your package.json with this data?',
            name: 'update',
            default: false
        }
    ], (answers) => {
        var enjinJSON = {
            name: answers.name,
            version: answers.version,
            description: answers.description,
            author: answers.author,
            mobile: false,
            local: true,
            debug: true
        };
        createEnjin(enjinJSON, callback);

        if (answers.update) {
            var packageJSON = {
                name: cleanString(answers.name.toLowerCase()),
                version: answers.version,
                description: answers.description,
                author: answers.author
            };
            createOrUpdatePackage(packageJSON, callback);
        }
    });
};