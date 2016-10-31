const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addController = require('../../services/addController');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addController(argv.n, 'controller', argv.d.split(','));
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the controller?',
            name: 'controller'
        }, {
            type: 'input',
            message: 'What dependencies need to be injected? (Comma Separated List)',
            name: 'dependencies'
        }], function(res) {
            addController(res.controller, 'controller', res.dependencies.split(','));
            callback();
        });
    }
};
