const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
const argv    = require('yargs').argv;
const merge   = require('../services/merge');

module.exports = function(enjinDir) {
    var action = process.argv[3] ? process.argv[3] : 'release';
    var environment = process.argv[4] ? process.argv[4] : 'app';
    console.log('Setting Variables from enjin.json...');
    try {
        env = JSON.parse(fs.readFileSync(`.env-${environment}`));
    } catch(e) {
        env = {};
        console.log(e);
    }
    var enjin  = JSON.parse(fs.readFileSync('enjin.json'));
    enjin = merge(enjin, env);
    var keystore = argv.keystore ? argv.keystore : argv.k ? argv.k : enjin.android.keystore ? enjin.android.keystore : 'my-release-key.keystore';
    var keystorePassword = argv.password ? argv.password : argv.p ? argv.p : enjin.android.keystorePassword;
    var apkPath = argv.output ? argv.output : argv.o ? argv.o : './platforms/android/build/outputs/apk/';
    var alias = argv.alias ? argv.alias : argv.a ? argv.a : enjin.android.alias ? enjin.android.alias : 'alias_name' ;
    var env = {};
    
    if (!keystorePassword && action === 'release') {
        console.log('Error: Keystore password is required in either .env or as a parameter');
        return false;
    }

    console.log(`Building app for ${environment} environment...`);
    exec(`gulp build -e ${environment}`, {
        cwd: process.cwd()
    }, function(error, stdout, stderr) {
        if (action === 'release') {
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
        } else if (action === 'run') {
            console.log(`Building Android release...`);
            exec(`ionic run android`, {
                cwd: process.cwd()
            }, function(error, stdout, stderr) {
                console.log('App successfully deployed on device or simulator! ^_^');
            });
        }
    });
};