const fs = require('fs-extra');


module.exports = function(callback = false) {
    var enjinPath = process.cwd() + '/enjin.json';
    fs.exists(enjinPath, (exists) => {
        if (callback && typeof callback === 'function') {
            callback(exists);
        }

        return false;
    });
};