module.exports = function(enjinDir, callback) {
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
                    exec('git config credential.helper wincred', {cwd: folderPath}, function(error, stdout, stderr){
                        console.log('App installed! ^_^');
                        if (callback && typeof callback === 'function') {
                            callback();
                        }
                    });
                });
            });
        });
    });
};