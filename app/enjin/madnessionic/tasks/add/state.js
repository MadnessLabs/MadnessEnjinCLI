const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addState = require('../../services/addState');


module.exports = function(gulp, callback) {
    if (argv.n && argv.v) {
        addState(argv.n, argv.v);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the state?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What is the name of the view?',
            name: 'view',
            default: 'tab'
        }], function(res) {
            addState(res.name, res.view);
            callback();
        });
    }
};