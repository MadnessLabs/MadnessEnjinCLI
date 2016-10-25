#! /usr/bin/env node

'use strict';

const slash   = require('slash');
const enjinDir = slash(__dirname);


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