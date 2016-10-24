const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removePopover = require('../../services/removePopover');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removePopover(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the popover you would like to remove?',
            name: 'name'
        }], function(res) {
            removePopover(res.name);
            callback();
        });
    }
};