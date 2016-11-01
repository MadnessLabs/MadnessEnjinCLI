const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addPage = require('../../services/addPage');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addPage(argv.n, argv.r ? argv.r.split(',') : false);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the page?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What resolves will the page need?',
            name: 'resolves',
            default: false
        }], function(res) {
            addPage(res.name, res.resolves ? res.resolves.split(',') : false);
            callback();
        });
    }
};