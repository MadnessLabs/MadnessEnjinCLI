const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');

const merge   = require('../services/merge');
const appName = require('../services/appName');
const grantRights = require('../services/grantRights');


module.exports = function(enjinDir) {
    var currentDir = process.cwd();
    var action = process.argv[3] || 'init';
    var enjinPath = currentDir + '/enjin.json';
    var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
    var envPath = currentDir + '/enjin.local.json';
    var envJSON = JSON.parse(fs.readFileSync(envPath));
    var enjin = merge(enjinJSON, envJSON);
    var name = appName(enjin.name);
    var repoDir = `/var/repo/test/${name}`;
    var hooksDir = `${repoDir}/hooks`;
    var postReceiveTemplate = `${enjinDir}/app/enjin/${enjin.stack}/templates/bin/post-receive`;

    if (action === 'server') {
        var user = process.argv[4];
        var token = process.argv[5];
        if (!user || !token) {
            console.log('No username and token found');
            return false;
        }
        console.log('Creating deploy hook scripts...');
        fs.readFile(postReceiveTemplate, 'utf8', (err, postReceiveFile) => {
            var postReceive = _.template(postReceiveFile)(enjin);
            fs.outputFile(`${hooksDir}/post-receive`, postReceive, (err) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Enabling hooks...');
                    exec(`chmod +x post-receive`, {cwd: hooksDir}, function(error, stdout, stderr){
                        exec(`id -u ${user}`, {cwd: hooksDir}, function(error, stdout, stderr){
                            console.log(stdout, error, stderr);
                            if (Number.isNaN(Number(stdout))) {
                                exec(`echo ${token} | passwd ${user} --stdin`, {cwd: hooksDir}, function(error, stdout, stderr){
                                    console.log(stdout, error, stderr);
                                    console.log(`User created to deploy to MadnessEnjin.net...`);
                                    grantRights(user, repoDir, () => {
                                        console.log('Successfully setup deploy on server! ^_^');
                                    });
                                });
                            } else {
                                grantRights(user, repoDir, () => {
                                    console.log('Successfully setup deploy on server! ^_^');
                                });
                            }
                        });
                    });
                }
            });
        });
    }
};