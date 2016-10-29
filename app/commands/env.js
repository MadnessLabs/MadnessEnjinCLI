const fs      = require('fs');


module.exports = function(enjinDir) {
    var envJSON = {
        'enjinPath': enjinDir
    };
    var envPath = process.cwd() + '/.env';

    if (process.argv[3]) {
        envPath += '-' + process.argv[3];
    }

    fs.writeFile(envPath, JSON.stringify(envJSON), function(err) {
        if(err) {
            return console.log(err);
        }
    });
};