const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addModal = require('../../services/addModal');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addModal(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the modal?',
            name: 'name'
        }], function(res) {
            addModal(res.name);
            callback();
        });
    }
};