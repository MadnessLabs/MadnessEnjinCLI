const fs = require('fs-extra');


module.exports = function(enjinJSON, callback = false) {
    fs.outputJson(process.cwd() + '/enjin.json', enjinJSON, {spaces: 4}, (err) => {
        if (err) {
            console.log('There was an error creating your enjin.json file!');
            return false
        }

        if (callback && typeof callback === 'function') {
            callback();
        }

        console.log('Enjin Created!');
    });
};