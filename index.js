#! /usr/bin/env node

'use strict';

const slash   = require('slash');
const enjinDir = slash(__dirname);
const fs = require('fs');
const packageJSON = JSON.parse(fs.readFileSync(enjinDir + '/package.json'));


if (process.argv.length > 2) {
    process.argv.forEach(function (val, index, array) {
        if (index === 2) {
            var modulePath = 'app/commands/' + val;
            try {
                var command = require(enjinDir + '/' + modulePath);
                command(enjinDir);
            } catch (error) {
                console.log(error);
                console.log('Sorry ' + val + ' is not an enjin command...yet...?!');
            }
        }
    });
} else {
    console.log('Madness Enjin - App building assistant by Madness Labs');
    console.log('If you like our command line tool then check out our new app building app @ MadnessEnjin.net.\nIt makes the process even easier and the best part it\'s FREE for Open Source! ^_^');
    console.log('Version: ' + packageJSON.version + '\n');
    console.log('--- CURRENT COMMANDS ---');
    console.log('start APP_NAME\nThis will start a new app in the folder APP_NAME\n\r');
    console.log('install REPO_LINK [FOLDER_NAME]\nThis will clone and install an app from a repo link\n\r');
    console.log('env [ENVIRONMENT]\nThis will create a new .env file with an optional name\n\r');
    console.log('android [ACTION] [ENVIRONMENT]');
    console.log('    [ACTION] = release - This will build Android APK release from your project.');
    console.log('    [ACTION] = run - This will build a debug Android APK from your project and run on emulator or connected device.');
    console.log('    [ENVIRONMENT] - This controls which .env file to use to build your app.');
    console.log('    -k --keystore = The path to your android keystore (Default: enjin.android.keystore)');
    console.log('    -p --password = The keystore password (Default: enjin.android.keystorePassword)');
    console.log('    -a --alias = The app alias for android (Default: alias_name)');
}