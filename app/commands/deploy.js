const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');

const merge   = require('../services/merge');
const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var currentDir = process.cwd();
    var action = process.argv[3] || 'init';
    var enjinPath = currentDir + '/enjin.json';
    var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
    var envPath = currentDir + '/.env';
    var envJSON = JSON.parse(fs.readFileSync(envPath));
    var enjin = merge(enjinJSON, envJSON);
    var name = appName(enjin.name);
    var hooksDir = `/var/repo/test/${name}/hooks`;
    var postReceiveTemplate = `${enjinDir}/app/enjin/${enjin.stack}/templates/bin/post-receive`;

    if (action === 'server') {
        console.log('Creating deploy hook scripts...');
        fs.readFile(postReceiveTemplate, 'utf8', (err, postReceiveFile) => {
            var postReceive = _.template(postReceiveFile)(enjin);
            fs.outputFile(`${hooksDir}/post-receive`, postReceive, (err) => {
                if (err) {
                    return console.error(err);
                } else {
                    console.log('Enabling hooks...');
                    exec(`chmod +x post-receive`, {cwd: hooksDir}, function(error, stdout, stderr){
                        console.log('Successfully setup deploy on server! ^_^');
                    });
                }
            });
        });
    }
};