const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
const argv    = require('yargs').argv;
var inquirer  = require('inquirer');

const merge   = require('../services/merge');
const setEnv = require('../services/setEnv');
const addPlatform = require('../services/android/addPlatform');
const run = require('../services/android/run');
const createKeystore = require('../services/android/createKeystore');


module.exports = function(enjinDir) {
    var action = process.argv[3] ? process.argv[3] : 'release';
    var environment = process.argv[4] ? process.argv[4] : 'app';
    
    function androidCommand(action, environment, enjin) {
        var keystore = argv.keystore ? argv.keystore : argv.k ? argv.k : enjin.android && enjin.android.keystore ? enjin.android.keystore : 'my-release-key.keystore';
        var keystorePassword = argv.password ? argv.password : argv.p ? argv.p : enjin.android && enjin.android.keystorePassword ? enjin.android.keystorePassword : '';
        var apkPath = argv.output ? argv.output : argv.o ? argv.o : './platforms/android/build/outputs/apk/';
        var alias = argv.alias ? argv.alias : argv.a ? argv.a : enjin.android && enjin.android.alias ? enjin.android.alias : 'alias_name' ;
        
        if (!fs.existsSync(keystore) && !keystorePassword) {
            console.log('No keystore found for your project. Let\'s create one...');
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the password you would like to use for your keystore?',
                    name: 'password'
                }
            ], (answers) => {
                createKeystore(environment, answers, () => {
                    setEnv((enjin) => {
                        androidCommand(action, environment, enjin);
                    }, environment);
                });
            });
        } else {
            if (!keystorePassword && action === 'release') {
                console.log('Error: Keystore password is required in either enjin.[Environment].json or as a parameter');
                return false;
            }

            console.log(`Building app for ${environment} environment...`);
            exec(`gulp build -e ${environment}`, {
                cwd: process.cwd()
            }, function(error, stdout, stderr) {
                if (action === 'release') {
                    console.log(`Building Android release...`);
                    exec(`cordova plugin remove cordova-plugin-console`, {
                        cwd: process.cwd()
                    }, function(error, stdout, stderr) {
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
                } else if (action === 'run') {
                    run((error) => {
                        if (error && error.indexOf('cordova platform add') >= 0) {
                            addPlatform(() => {
                                console.log(`Building Android release...`);
                                run();
                            });
                        }
                    });
                }
            });
        }
    }

    setEnv((enjin) => {
        if (!fs.existsSync('platforms')) {
            addPlatform(() => {
                androidCommand(action, environment, enjin);
            });
        } else {
            androidCommand(action, environment, enjin);
        }
        
    }, environment);
    
};