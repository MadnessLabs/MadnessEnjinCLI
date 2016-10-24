const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeController = require('../../services/removeController');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removeController(argv.n, argv.d);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the state name of the page you would like to remove?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What is the directory of the controller? (Relative to app/ts/)',
            name: 'dir',
            default: 'controller'
        }], function(res) {
            removeController(res.name, res.dir);
            callback();
        });
    }
};