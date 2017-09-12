const exec    = require('child_process').exec;

const appName = require('../services/appName');
const createComponent = require('../services/component/create');


module.exports = function(enjinDir) {
    var type = process.argv[3];
    var name = process.argv[4];

    console.log(`Creating ${name} ${type}...`);

    switch(type) {
        case 'component':
            var props = process.argv[5];
            if (props) {
                var propList = [props];
                if (props.indexOf(',') > 0) {
                    propList = props.split(',');
                }
            }
            createComponent(name, propList, (data) => {
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