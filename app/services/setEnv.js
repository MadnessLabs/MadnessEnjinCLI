const fs      = require('fs-extra');

const merge   = require('./merge');


module.exports = function(callback, environment = 'local') {
    console.log('Setting Variables from enjin.json...');
    try {
        var env = JSON.parse(fs.readFileSync(`enjin.${environment}.json`));
        var enjin  = JSON.parse(fs.readFileSync('enjin.json'));
        if (callback && typeof callback === 'function') {
            callback(merge(enjin, env));
        }
    } catch(e) {
        console.log(e);
    }
};