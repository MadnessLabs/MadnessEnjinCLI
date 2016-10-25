const copydir = require('copy-dir');
const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs');

const appName = require('../services/appName');


module.exports = function(enjinDir) {
    var enjinType = 'madnessionic';
    var newAppName = appName(process.argv[3]) || 'EnjinApp';
    var fromDir = enjinDir + '/app/boilerplates/' + enjinType;
    var toDir = process.cwd() + '/' + newAppName;

    copydir(fromDir, toDir, function(err){
        if(err){
            console.log(err);
        } else {
            var gulpfilePath = toDir + '/gulpfile.js';
            fs.readFile(gulpfilePath, 'utf8', function(err, contents) {
                var compiled = _.template(contents);
                var gulpfile = compiled({ 'enjinDir': enjinDir, 'enjinType': 'madnessionic'});
                fs.writeFile(gulpfilePath, gulpfile, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    var packagePath = toDir + '/package.json';
                    var packageJSON = JSON.parse(fs.readFileSync(packagePath));
                    packageJSON.name = newAppName.toLowerCase();
                    fs.writeFile(packagePath, JSON.stringify(packageJSON), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        var enjinPath = toDir + '/enjin.json';
                        var enjinJSON = JSON.parse(fs.readFileSync(enjinPath));
                        enjinJSON.name = newAppName;
                        fs.writeFile(enjinPath, JSON.stringify(enjinJSON), function(err) {
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
        }
    });
};