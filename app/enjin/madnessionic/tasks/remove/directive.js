const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeComponent = require('../../services/removeComponent');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removeComponent(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the directive you would like to remove? (CamelCase)',
            name: 'name'
        }], function(res) {
            removeComponent(res.name);
            callback();
        });
    }
};