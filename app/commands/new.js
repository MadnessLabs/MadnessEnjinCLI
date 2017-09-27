const exec    = require('child_process').exec;

const createComponent = require('../services/component/create');


module.exports = function(enjinDir) {
    var type = process.argv[3];
    var name = process.argv[4];

    console.log(`Creating ${name} ${type}...`);

    switch(type) {
        case 'component':
            createComponent(name, process.argv[5], (data) => {
                if (data.error) {
                    console.log(data.message);
                } else {
                    console.log(`${name} component has been created! ^_^`);
                }
            });
            break;
        default:
            console.log(`Cannot create ${type}!`);
    }
};