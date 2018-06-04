const shareComponent = require('../services/component/share');


module.exports = function(enjinDir) {
    var type = process.argv[3];
    var name = process.argv[4];

    console.log(`Sharing ${name} ${type}...`);

    switch(type) {
        case 'component':
            shareComponent(name);
            break;
        default:
            console.log(`Cannot share ${type}!`);
    }
};