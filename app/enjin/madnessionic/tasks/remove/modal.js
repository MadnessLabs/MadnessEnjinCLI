const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeModal = require('../../services/removeModal');


module.exports = function(gulp, callback) { 
    if (argv.n) {
        removeModal(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the modal you would like to remove?',
            name: 'name'
        }], function(res) {
            removeModal(res.name);
            callback();
        });
    }
};