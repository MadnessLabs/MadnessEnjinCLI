const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const addRoute = require('../../services/addRoute');


module.exports = function(gulp, callback) {
    if (argv.n && argv.n && argv.t && argv.c) {
        addRoute(argv.n, argv.u, argv.t, argv.c);
        callback();
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the state name?',
            name: 'name'
        },{
            type: 'input',
            message: 'What is the url? ( Beginning with "/" )',
            name: 'url'
        },{
            type: 'input',
            message: 'What is the path to the template?',
            name: 'template'
        },{
            type: 'input',
            message: 'What is the name of the controller?',
            name: 'controller'
        }], function(res) {
            addRoute(res.name, res.url, res.template, res.controller);
            callback();
        });
    }
};