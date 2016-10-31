const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const removeResolver = require('../../services/removeResolver');


module.exports = function(gulp, callback) {
    if (argv.n) {
        removeResolver(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the resolver you would like to remove?',
            name: 'name'
        }], function(res) {
            removeResolver(res.name);
            callback();
        });
    }
};