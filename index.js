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
                var command = require('./' + modulePath);
                command(enjinDir);
            } catch (error) {
                console.log('Sorry ' + val + ' is not an enjin command...yet...?!');
            }
        }
    });
} else {
    console.log('Madness Enjin - It\'s the Alfred to your Batman');
    console.log('Version: ' + packageJSON.version);
    console.log('\n');
    console.log('--- CURRENT COMMANDS ---');
    console.log('start APP_NAME - This will start a new app in the folder APP_NAME');
}