const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addFilter = require('../../services/addFilter');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addFilter(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the filter?',
            name: 'name'
        }], function(res) {
            addFilter(res.name);
            callback();
        });
    }
};