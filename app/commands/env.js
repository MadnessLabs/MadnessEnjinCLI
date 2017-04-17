const fs      = require('fs');


module.exports = function(enjinDir) {
    var enjinJSON = JSON.parse(fs.readFileSync(process.cwd() + '/enjin.json'));
    var envJSON = {
        'enjinPath': enjinDir + '/',
        'stack': enjinJSON.stack,
        'mobile': enjinJSON.mobile,
        'local': enjinJSON.local,
        'debug': enjinJSON.debug
    };
    var envPath = process.cwd() + '/enjin.local.json';

    if (process.argv[3]) {
        envPath += '-' + process.argv[3];
    }

    fs.writeFile(envPath, JSON.stringify(envJSON, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }
    });
};