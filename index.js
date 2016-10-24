#! /usr/bin/env node

'use strict';

const copydir = require('copy-dir');
const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs');
const slash   = require('slash');


function packageName(string) {
    return string.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
}

process.argv.forEach(function (val, index, array) {
    if (index === 2 && val === 'start') {
        var enjinType = 'madnessionic';
        var newAppName = process.argv[3] || 'enjinapp';
        var fromDir = slash(__dirname) + '/app/boilerplates/' + enjinType;
        var toDir = process.cwd() + '/' + newAppName;
        var enjinDir = slash(__dirname) + '/app/enjin/' + enjinType;

        copydir(fromDir, toDir, function(err){
            if(err){
                console.log(err);
            } else {
                var gulpfilePath = toDir + '/gulpfile.js';
                fs.readFile(gulpfilePath, 'utf8', function(err, contents) {
                    var compiled = _.template(contents);
                    var gulpfile = compiled({ 'enjinDir': slash(__dirname), 'enjinType': 'madnessionic'});
                    fs.writeFile(gulpfilePath, gulpfile, function(err) {
                        if(err) {
                            return console.log(err);
                        }

                        var packagePath = toDir + '/package.json';
                        var packageJSON = JSON.parse(fs.readFileSync(packagePath));
                        packageJSON.name = packageName(newAppName);
                        fs.writeFile(packagePath, JSON.stringify(packageJSON), function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            var enjinPath = toDir + '/enjin.json';
                            var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
                            enjinJSON.name = packageName(newAppName);
                            fs.writeFile(enjinPath, JSON.stringify(enjinJSON), function(err) {
                                if(err) {
                                    return console.log(err);
                                }
                                var runFilePath = enjinDir + '/templates/ts/run.ts';
                                fs.readFile(runFilePath, 'utf8', function(err, contents) {
                                    var compiled = _.template(contents);
                                    var runFile = compiled({ 'app': packageName(newAppName)});
                                    fs.writeFile(toDir + '/app/ts/run.ts', runFile, function(err) {
                                        if(err) {
                                            return console.log(err);
                                        }
                                        console.log("Boilerplate copied from https://github.com/madnesslabs/madnessionic ...");
                                        console.log("Now installing ...");
                                        exec('npm install', {
                                            cwd: toDir
                                        }, function(error, stdout, stderr) {
                                            console.log('Application installed! ^_^');
                                        });
                                    });
                                });
                            });
                        }); 
                    }); 
                });
            }
        });
    }
});