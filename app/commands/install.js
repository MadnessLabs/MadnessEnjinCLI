const exec    = require('child_process').exec;


module.exports = function(enjinDir) {
    enjinModule = process.argv[3];
    if (process.argv[4]) {
        enjinModule += ' ' + process.argv[4];
    }
    exec('git clone https://github.com/' + enjinModule, function() {
        console.log('Cloned ' + enjinModule + ' ...');
    });
};