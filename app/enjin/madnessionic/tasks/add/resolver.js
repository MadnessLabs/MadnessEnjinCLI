const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addResolver = require('../../services/addResolver');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addResolver(argv.n, argv.r ? argv.r.split(',') : false);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the resolver?',
            name: 'name'
        }, {
            type: 'input',
            message: 'What do you need to resolve? (Comma Separated List)',
            name: 'resolves'
        }], function(res) {
            addResolver(res.name, res.resolves ? res.resolves.split(',') : false);
            callback();
        });
    }
};