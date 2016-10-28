const exec    = require('child_process').exec;
const fs      = require('fs');


module.exports = function(enjinDir) {
    var enjinModule = process.argv[3];
    var gitClone = 'git clone ';
    var folderName = '';

    if (enjinModule.indexOf('://') === -1) {
        gitClone += 'https://';
        if (enjinModule.indexOf('@') > -1) {
            var credentials = enjinModule.split('@'); 
            gitClone += credentials[0];
            enjinModule = credentials[1];
        }
        gitClone += 'github.com/';
    }
    
    if (process.argv[4]) {
        folderName = process.argv[4];
        enjinModule += ' ' + filderName;
    } else {
        folderName = enjinModule.split('/')[1];
    }

    gitClone += enjinModule;

    console.log('Cloning ' + enjinModule + ' into ' + folderName + ' ...');
    exec(gitClone, function(error, stdout, stderr) {
        console.log('Installing Dependencies ...');
        
        exec('npm install', {cwd: process.cwd() + '/' + folderName}, function(error, stdout, stderr){
            console.log('App installed successfully! ^_^');
        });
    });
};