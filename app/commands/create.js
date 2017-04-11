const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');

const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var stack = process.argv[4] || 'madnessionic';
    var newAppName = appName(process.argv[3]) || 'EnjinApp';
    var fromDir = enjinDir + '/app/boilerplates/' + stack;
    var toDir = process.cwd() + '/' + newAppName;
    var user = process.argv[5];
    var token = process.argv[6];
    var repo = process.argv[7];

    console.log(`Copying boilerplate from https://github.com/madnesslabs/${stack} ...`);
    fs.copy(fromDir, toDir, function(err){
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
                                console.log('Initializing Git Repo...');
                                exec('git init', {cwd: toDir }, function(error, stdout, stderr){
                                    console.log('Creating Initial Commit...');
                                    exec('git add .', {cwd: toDir }, function(error, stdout, stderr){
                                        exec('git commit -m "Scaled with MadnessEnjin.net"', {cwd: toDir }, function(error, stdout, stderr){
                                            console.log('Connecting Repo to Github...');
                                            exec(`git remote add origin https://${user}:${token}@github.com/${repo}`, {cwd: toDir }, function(error, stdout, stderr){
                                                console.log('Pushing Project to Github...');
                                                exec(`git push -u origin master`, {cwd: toDir }, function(error, stdout, stderr){
                                                    console.log(`App installed @ http://${newAppName}.MadnessEnjin.net ! ^_^`);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });
};