const addComponent = require('../services/component/add');


module.exports = function(enjinDir) {
    var name = process.argv[3];
    console.log(`Creating ${name} component...`);
    addComponent(name, process.argv[4]);
};