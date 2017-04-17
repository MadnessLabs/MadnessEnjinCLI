const fs      = require('fs');
const nconf = require('nconf');

module.exports = function(enjinDir) {
    const configFile = `${enjinDir}/enjin.json`;

    nconf.argv()
        .env()
        .file({ file: configFile });
    
    nconf.clear('token');
    nconf.save(function() {
        console.log('You have been successfully logged out! ^_^');
    });
};