#! /usr/bin/env node

'use strict';

const slash = require('slash');
const enjinDir = slash(__dirname);
const fs = require('fs-extra');
const packageJSON = JSON.parse(fs.readFileSync(enjinDir + '/package.json'));


if (process.argv.length > 2) {
    process.argv.forEach(function (val, index, array) {
        if (index === 2) {
            var modulePath = 'app/commands/' + val;
            try {
                var command = require(enjinDir + '/' + modulePath);
                command(enjinDir);
            } catch (e) {
                console.log(e);
                if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
                    console.log('Sorry ' + val + ' is not an enjin command...yet...?!');
                } else {
                    console.log(e);
                }
            }
        }
    });
} else {
    var docs = fs.readFileSync(enjinDir + '/README.md', 'utf8');
    console.log(docs);
}