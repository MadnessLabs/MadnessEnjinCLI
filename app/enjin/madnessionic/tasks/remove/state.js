const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeState = require('../../services/removeState');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removeState(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the state you would like to remove?',
            name: 'name'
        }], function(res) {
            removeState(res.name);
            callback();
        });
    }
};