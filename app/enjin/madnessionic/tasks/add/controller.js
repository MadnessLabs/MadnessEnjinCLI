const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addController = require('../../services/addController');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addController(argv.n, 'controller');
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the controller?',
            name: 'controller'
        }], function(res) {
            addController(res.controller, 'controller');
            callback();
        });
    }
};
