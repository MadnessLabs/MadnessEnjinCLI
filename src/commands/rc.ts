const removeComponent = require('../services/component/remove');


module.exports = function(enjinDir) {
    var name = process.argv[3];
    console.log(`Removing ${name} component...`);
    removeComponent(name);
};