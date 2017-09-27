const inquirer = require('inquirer');
const argv     = require('yargs').argv;

const createComponent = require('../../../../services/component/create');

module.exports = function(gulp, callback) {
    if (argv.n) {
        createComponent(argv.n, argv.p, (res) => {
            if (res.error) {
                console.error(res.message);
            } else {
                console.log(`${argv.n} component created successfully!`);
            }
            callback();
        });
        
    } else {
        inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the component? (Must have a - in the name)',
            name: 'name'
        }, {
            type: 'input',
            message: 'What props will you have? (Comma separated)',
            name: 'props',
            default: false
        }], function(res) {
            createComponent(res.name, res.props, (res) => {
                if (res.error) {
                    console.error(res.message);
                } else {
                    console.log(`${res.name} component created successfully!`);
                }
                callback();
            });
        });
    }    
};
