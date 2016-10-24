const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addDirective = require('../../services/addDirective');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addDirective(argv.n, argv.a, argv.t, argv.r);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the directive?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What attributes will you be binding? (Comma separated)',
            name: 'attrs',
            default: false
        }], function(res) {
            addDirective(res.name, res.attrs);
            callback();
        });
    }
};