const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeService = require('../../services/removeService');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removeService(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the state name of the service you would like to remove?',
            name: 'service'
        }], function(res) {
            removeService(res.service);
            callback();
        });
    }
};