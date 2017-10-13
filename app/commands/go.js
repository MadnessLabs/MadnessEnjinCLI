const fs      = require('fs-extra');
const exec    = require('child_process').exec;
const spawn    = require('child_process').spawn;
const bs       = require('browser-sync').create();

const rev  = require('./rev');

module.exports = function(enjinDir) {
    var envType = process.argv[3];
    var envPath = `${process.cwd()}/enjin${envType ? ('.' + envType) : ''}.json`;
    var envJSON = JSON.parse(fs.readFileSync(envPath));

    process.env.ENJIN = JSON.stringify(envJSON);

    fs.writeFile(envPath, JSON.stringify(envJSON, null, 4), function(err) {
        if(err) {
            return console.log(err);
        }

        var buildProcess = spawn(`npm start`, [`-- -e ${envType}`, '-b false'], {cwd: process.cwd(), shell: true});

        buildProcess.stdout.on('data', function(data) {
            var message = data.toString();
            process.stdout.write(message);
            if (data.indexOf('Access URLs:') > 0) {
                rev(enjinDir);
            }
        });

        buildProcess.on('error', function(data) {
            console.log(data);
            process.stdout.write(data.toString());
        });

        buildProcess.on('close', function (code) { 
            console.log("Finished with code " + code);
        });
        
    });
};