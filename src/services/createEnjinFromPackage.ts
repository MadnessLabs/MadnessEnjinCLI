const fs = require('fs-extra');

const createEnjin = require('./createEnjin');


module.exports = function(callback = false) {
    fs.readJson(process.cwd() + '/package.json', (err, package) => {
        if (err) {
            console.log('There was an error reading your package.json file!');
            return false;
        }

        var enjinJSON = {
            name: package.name,
            version: package.version,
            description: package.description,
            author: package.author,
            mobile: false,
            local: true,
            debug: true
        };

        createEnjin(enjinJSON, callback);
    });
};