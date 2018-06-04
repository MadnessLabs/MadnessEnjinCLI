const removeComponent = require('../services/component/remove');


module.exports = function(enjinDir) {
    var type = process.argv[3];
    var name = process.argv[4];

    console.log(`Removing ${name} ${type}...`);

    switch(type) {
        case 'component':
            removeComponent(name);
            break;
        default:
            console.log(`Cannot create ${type}!`);
    }
};