const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
const nconf   = require('nconf');
const suppose = require('suppose');
const assert  = require('assert');

const merge   = require('../services/merge');
const appName = require('../services/appName');
const grantRights = require('../services/grantRights');


module.exports = function(enjinDir) {
    const configFile = `${enjinDir}/enjin.json`;
    nconf.argv()
        .env()
        .file({ file: configFile });

    var currentUser = nconf.get('user');
    var currentDir = process.cwd();
    var action = process.argv[3] || 'init';
    var enjinPath = currentDir + '/enjin.json';
    var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
    var envPath = currentDir + '/enjin.local.json';
    var envJSON = JSON.parse(fs.readFileSync(envPath));
    var enjin = merge(enjinJSON, envJSON);
    var name = appName(enjin.name).toLowerCase();
    var subdomain = enjin.subdomain ? enjin.subdomain : name;
    var repoDir = `/var/repo/test/${subdomain}`;
    var hooksDir = `${repoDir}/hooks`;
    var testDir = `/var/www/test/${subdomain}`;
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
            if (!enjin.subdomain) {
                enjin.subdomain = subdomain;
            }
            var postReceive = _.template(postReceiveFile)(enjin);
            fs.outputFile(`${hooksDir}/post-receive`, postReceive, (err) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Enabling hooks...');
                    exec(`chmod +x post-receive`, {cwd: hooksDir}, function(error, stdout, stderr){
                        exec(`id -u ${user}`, {cwd: hooksDir}, function(error, stdout, stderr){
                            if (stderr) {
                                exec(`useradd -m -g enjineers -p $(echo ${token} | openssl passwd -1 -stdin) ${user}`, {cwd: hooksDir}, function(error, stdout, stderr){
                                    console.log(`User created to deploy to MadnessEnjin.net...`);
                                    grantRights(user, repoDir, (stdout, stderr) => {
                                        grantRights(user, testDir, (stdout, stderr) => {
                                            console.log('Successfully setup deploy on server! ^_^');
                                        });
                                    });
                                });
                            } else {
                                grantRights(user, repoDir, (stdout, stderr) => {
                                    grantRights(user, testDir, (stdout, stderr) => {
                                        console.log('Successfully setup deploy on server! ^_^');
                                    });
                                });
                            }
                        });
                    });
                }
            });
        });
    } else {
        suppose('git', ['push', 'test']).when(/\w{1,}@\d{3}.\d{3}.\d{3}.\d{3}'s password:/)
        .respond(currentUser.token).on('error', (err) => {
            console.log(err.message);
        }).end((code) => {
            console.log(currentUser.token + ' I did it! ^_^');
        });
    }
};