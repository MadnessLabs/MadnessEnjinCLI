const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeRoute = require('../../services/removeRoute');

module.exports = function(gulp, callback) {
    if (argv.n) {
        removeRoute(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the route you would like to remove?',
            name: 'name'
        }], function(res) {
            removeRoute(res.name);
            callback();
        });
    }
};