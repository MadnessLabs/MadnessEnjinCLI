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
    exec(gitClone, function(error, stdout, stderr) {
        console.log('Setting up environments ...');
        var envPath = folderPath + '/enjin.sample.json';
        var envJSON = JSON.parse(fs.readFileSync(envPath));
        var enjinJSON = JSON.parse(fs.readFileSync(folderPath + '/enjin.json'));
        envJSON.enjinPath = enjinDir + '/';
        envJSON.stack = enjinJSON.stack;
        fs.writeFile(folderPath + '/enjin.local.json', JSON.stringify(envJSON), function(err) {
            if(err) {
                return console.log(err);
            }
            envJSON.mobile = true;
            envJSON.local = false;
            fs.writeFile(folderPath + '/enjin.app.json', JSON.stringify(envJSON, null, 4), function(err) {
                var packagePath = folderPath + '/package.json';
                var packageJSON = JSON.parse(fs.readFileSync(packagePath));
                packageJSON.scripts.postinstall = 'gulp enjin:reinstall';
                fs.writeFile(packagePath, JSON.stringify(packageJSON, null, 4), function(err) {
                    console.log('Now installing ...');
                    exec('npm install', {cwd: folderPath}, function(error, stdout, stderr){
                        exec('git config --global credential.helper wincred', {cwd: folderPath}, function(error, stdout, stderr){
                            console.log('App installed! ^_^');
                            if (callback && typeof callback === 'function') {
                                callback();
                            }
                        });
                    });
                });
            });
        });
    });
};