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
    var folderPath = process.cwd() + '/' + folderName;
    
    gitClone += enjinModule;

    console.log('Cloning ' + enjinModule + ' into ' + folderName + ' ...');
    exec(gitClone, function(error, stdout, stderr) {
        console.log('Setting up environments ...');
        var envPath = folderPath + '/.env-sample';
        var envJSON = JSON.parse(fs.readFileSync(envPath));
        var enjinJSON = JSON.parse(fs.readFileSync(folderPath + '/enjin.json'));
        envJSON.enjinPath = enjinDir + '/';
        envJSON.type = enjinJSON.type;
        fs.writeFile(folderPath + '/.env', JSON.stringify(envJSON), function(err) {
            if(err) {
                return console.log(err);
            }
            envJSON.mobile = true;
            envJSON.local = false;
            fs.writeFile(folderPath + '/.env-app', JSON.stringify(envJSON, null, 4), function(err) {
                var packagePath = folderPath + '/package.json';
                var packageJSON = JSON.parse(fs.readFileSync(packagePath));
                packageJSON.scripts.postinstall = 'gulp enjin:reinstall';
                fs.writeFile(packagePath, JSON.stringify(packageJSON, null, 4), function(err) {
                    console.log('Now installing ...');
                    exec('npm install', {cwd: folderPath}, function(error, stdout, stderr){
                        console.log('App installed! ^_^');
                    });
                });
            });
        });
    });
};