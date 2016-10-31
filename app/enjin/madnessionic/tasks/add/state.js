const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addState = require('../../services/addState');


module.exports = function(gulp, callback) {
    if (argv.n && argv.v) {
        addState(argv.n, argv.v, argv.r.split(','));
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
        }, {
            type: 'input',
            message: 'What are the resolves needed? (Comma Separated List)',
            name: 'resolves'
        }], function(res) {
            addState(res.name, res.view, res.resolves.split(','));
            callback();
        });
    }
};