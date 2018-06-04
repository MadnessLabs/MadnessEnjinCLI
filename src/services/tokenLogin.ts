const fs    = require('fs');
const nconf = require('nconf');
const API = require('../services/API');

module.exports = function (enjinDir, token) {
    console.log('Logging into Madness Enjin...');
    const configFile = `${enjinDir}/enjin.json`;

    new API('get', 'login', {}, (data) => {
        nconf.argv()
            .env()
            .file({ file: configFile });

        nconf.set('user', data);

        nconf.save(function(err) {
            console.log('You have been successfully logged in! ^_^');
        });
    }, token);  
};