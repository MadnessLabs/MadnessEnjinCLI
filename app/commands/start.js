const copydir = require('copy-dir');
const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs');

const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var enjinType = 'madnessionic';
    var newAppName = appName(process.argv[3]) || 'EnjinApp';
    var fromDir = enjinDir + '/app/boilerplates/' + enjinType;
    var toDir = process.cwd() + '/' + newAppName;

    console.log("Copying boilerplate from https://github.com/madnesslabs/madnessionic ...");
    copydir(fromDir, toDir, function(err){
        if(err){
            console.log(err);
        } else {
            var packagePath = toDir + '/package.json';
            var packageJSON = JSON.parse(fs.readFileSync(packagePath));
            packageJSON.name = newAppName.toLowerCase();
            fs.writeFile(packagePath, JSON.stringify(packageJSON), function(err) {
                if(err) {
                    return console.log(err);
                }
                var enjinPath = toDir + '/enjin.json';
                var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
                enjinJSON.name = newAppName;
                fs.writeFile(enjinPath, JSON.stringify(enjinJSON), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    var envPath = toDir + '/.env-sample';
                    var envJSON = JSON.parse(fs.readFileSync(envPath));
                    envJSON.enjinPath = enjinDir + '/';
                    envJSON.type = enjinJSON.type;
                    fs.writeFile(toDir + '/.env', JSON.stringify(envJSON, null, 4), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        envJSON.mobile = true;
                        envJSON.local = false;
                        fs.writeFile(toDir + '/.env-app', JSON.stringify(envJSON, null, 4), function(err) {
                            console.log("Now installing ...");
                            exec('npm install', {
                                cwd: toDir
                            }, function(error, stdout, stderr) {
                                console.log('App installed! ^_^');
                            });
                        });
                    });
                });
            });
        }
    });
};