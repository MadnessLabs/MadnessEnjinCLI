const exec    = require('child_process').exec;
const fs      = require('fs');


module.exports = function(enjinDir, enjinModule, folderPath, callback) {
    var gitClone = 'git clone ';
    var folderName = '';

    if (enjinModule.indexOf('://') === -1) {
        gitClone += 'https://';
        if (enjinModule.indexOf('@') > -1) {
            var credentials = enjinModule.split('@'); 
            gitClone += credentials[0] + '@';
            enjinModule = credentials[1];
        }
        gitClone += 'github.com/';
    }

    if (folderPath) {
        folderName = folderPath;
        enjinModule += ' ' + folderName;
    } else {
        folderName = enjinModule.split('/')[1];
    }
    var folderPath = process.cwd() + '/' + folderName;

    gitClone += enjinModule;

    console.log('Cloning ' + enjinModule + ' into ' + folderName + ' ...');
    exec(gitClone, callback);
};