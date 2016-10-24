const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addPage = require('../../services/addPage');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addPage(argv.n);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the page?',
            name: 'name'
        }], function(res) {
            addPage(res.name);
            callback();
        });
    }
};