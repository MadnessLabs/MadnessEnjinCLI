const addComponent = require('../services/component/add');


module.exports = function(enjinDir) {
    var type = process.argv[3];
    var name = process.argv[4];

    console.log(`Creating ${name} ${type}...`);

    switch(type) {
        case 'component':
            addComponent(name, process.argv[5]);
            break;
        default:
            console.log(`Cannot create ${type}!`);
    }
};