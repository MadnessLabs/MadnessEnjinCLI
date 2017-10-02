const shareComponent = require('../services/component/share');


module.exports = function(enjinDir) {
    var name = process.argv[3];
    console.log(`Sharing ${name} component...`);
    shareComponent(name);
};