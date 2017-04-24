const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');

const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var stack = process.argv[4] || 'madnessionic';
    var rawAppName = process.argv[3];
    var newAppName = appName(rawAppName);
    var user = process.argv[5];
    var github_token = process.argv[6];
    var repo = process.argv[7];
    var token = process.argv[8];
    var subdomain = process.argv[9] ? process.argv[9] : newAppName.toLowerCase();
    var fromDir = enjinDir + '/app/boilerplates/' + stack;
    var toDir = process.cwd() + '/' + subdomain;
    var repoDir = '/var/repo/test';
    var github_link = `https://${user}:${github_token}@github.com/${repo}`;

    console.log(`Copying boilerplate from https://github.com/madnesslabs/${stack} ...`);
    fs.copy(fromDir, toDir, function(err){
        if(err){
            console.log(err);
        } else {
            var packagePath = toDir + '/package.json';
            var packageJSON = JSON.parse(fs.readFileSync(packagePath));
            packageJSON.name = newAppName.toLowerCase();
            packageJSON.scripts.postinstall = 'gulp enjin:reinstall';
            fs.writeFile(packagePath, JSON.stringify(packageJSON), function(err) {
                if(err) {
                    return console.log(err);
                }
                var enjinPath = toDir + '/enjin.json';
                var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
                enjinJSON.name = newAppName;
                if (process.argv[9]) {
                    enjinJSON.subdomain = subdomain;
                }
                fs.writeFile(enjinPath, JSON.stringify(enjinJSON), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    var envPath = toDir + '/enjin.sample.json';
                    var envJSON = JSON.parse(fs.readFileSync(envPath));
                    envJSON.enjinPath = enjinDir + '/';
                    envJSON.stack = enjinJSON.stack;
                    fs.writeFile(toDir + '/enjin.local.json', JSON.stringify(envJSON, null, 4), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        envJSON.mobile = true;
                        envJSON.local = false;
                        fs.writeFile(toDir + '/enjin.app.json', JSON.stringify(envJSON, null, 4), function(err) {
                            console.log("Now installing ...");
                            exec('npm install', {
                                cwd: toDir
                            }, function(error, stdout, stderr) {
                                if (repo && github_link && github_token && token) {
                                    try {
                                        fs.copySync(toDir + '/.npmignore', toDir + '/.gitignore');
                                    } catch (err) {
                                        console.error(err);
                                    }
                                    exec(`gulp enjin:reinstall`, {cwd: toDir }, function(error, stdout, stderr){
                                        console.log('Initializing Git Repo...');
                                        exec('git init', {cwd: toDir }, function(error, stdout, stderr){
                                            console.log('Creating Initial Commit...');
                                            exec('git add .', {cwd: toDir }, function(error, stdout, stderr){
                                                exec('git commit -m "Scaled with MadnessEnjin.net"', {cwd: toDir }, function(error, stdout, stderr){
                                                    console.log('Connecting Repo to Github...');
                                                    exec(`git remote add origin ${github_link}`, {cwd: toDir }, function(error, stdout, stderr){
                                                        console.log('Pushing Project to Github...');
                                                        exec(`git push -u origin master`, {cwd: toDir }, function(error, stdout, stderr){
                                                            console.log('Cleaning up...');
                                                            exec(`rimraf .git`, {cwd: toDir }, function(error, stdout, stderr){
                                                                console.log(`Setting up Testing server on ${subdomain}...`);
                                                                exec(`git clone ${github_link} ${subdomain} --bare`, {cwd: repoDir }, function(error, stdout, stderr){
                                                                    exec(`enjin deploy server ${user} ${token}`, {cwd: toDir }, function(error, stdout, stderr){
                                                                        console.log(stdout);
                                                                        console.log(`App installed @ http://${subdomain}.MadnessEnjin.net ! ^_^`);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                } else {
                                    console.log('App has been installed successfully! ^_^');
                                }
                            });
                        });
                    });
                });
            });
        }
    });
};