const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addPopover = require('../../services/addPopover');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addPopover(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the popover?',
            name: 'name'
        }], function(res) {
            addPopover(res.name);
            callback();
        });
    }
};