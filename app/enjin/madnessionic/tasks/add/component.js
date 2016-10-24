const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addComponent = require('../../services/addComponent');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addComponent(argv.n, argv.a, argv.r);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the component?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What attributes will you be binding? (Comma separated)',
            name: 'attrs',
            default: false
        }], function(res) {
            addComponent(res.name, res.attrs);
            callback();
        });
    }    
};
