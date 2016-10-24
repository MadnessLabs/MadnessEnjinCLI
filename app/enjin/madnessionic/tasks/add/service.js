const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addService = require('../../services/addService');


module.exports = function(gulp, callback) {
    if (argv.n) {
        addService(argv.n, argv.t);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the service?',
            name: 'name'
        }, {
            type: 'list',
            message: 'What type of service would you like to make?',
            name: 'type',
            choices: ['Empty', 'Rest'],
            filter: function(val) {
                if (val == 'Empty') {
                    return false;
                } else {
                    return val;
                }
            }
        }], function(res) {
            addService(res.name, res.type);
            callback();
        });
    }
};
