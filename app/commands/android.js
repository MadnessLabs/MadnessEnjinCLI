const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
const merge   = require('../services/merge');

module.exports = function(enjinDir) {
    console.log('Setting Variables from enjin.json...');
    var environment = process.argv[3] ? process.argv[3] : 'app';
    try {
        env = JSON.parse(fs.readFileSync(`.env-${environment}`));
    } catch(e) {
        env = {};
        console.log(e);
    }
    var enjin  = JSON.parse(fs.readFileSync('enjin.json'));
    enjin = merge(enjin, env);
    
    var keystore = process.argv[4] ? process.argv[4] : 'my-release-key.keystore';
    var keystorePassword = process.argv[5] ? process.argv[5] : enjin.android.keystorePassword;
    var alias = process.argv[6] ? process.argv[6] : enjin.android.alias ? enjin.android.alias : 'alias_name' ;
    var apkPath = enjin.android.apkPath ? enjin.android.apkPath : './platforms/android/build/outputs/apk/';
    var env = {};

    if (!keystorePassword) {
        console.log('Error: Keystore password is required in either .env or as a parameter');
        return false;
    }

    console.log(`Building app for ${environment} environment...`);
    exec(`gulp build -e ${environment}`, {
        cwd: process.cwd()
    }, function(error, stdout, stderr) {
        console.log(`Building Android release...`);
        exec(`cordova build --release android`, {
            cwd: process.cwd()
        }, function(error, stdout, stderr) {
            console.log(`Signing app with ${keystore} keystore...`);
            var cmdSign = `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${keystore} -storepass ${keystorePassword} ${apkPath}android-release-unsigned.apk ${alias}`;
            exec(cmdSign, {
                cwd: process.cwd()
            }, function(error, stdout, stderr) {
                console.log(`Zipping release into APK...`);
                var cmdZip = `zipalign -v 4 ${apkPath}android-release-unsigned.apk ${apkPath}${enjin.name}-${environment}-v${enjin.version}.apk`; 
                exec(cmdZip, {
                    cwd: process.cwd()
                }, function(error, stdout, stderr) {
                    console.log(`App has been successfully packaged at ${process.cwd()}${apkPath}${enjin.name}-${environment}-v${enjin.version}.apk.`);
                });
            });
        });
    });
};