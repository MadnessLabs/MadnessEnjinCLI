const copydir = require('copy-dir');
const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs');
var inquirer  = require('inquirer');

const merge   = require('../services/merge');
const dependencyMerge = require('../services/dependencyMerge');


function install(pluginJSON, callback) {
    if (pluginJSON.install.length > 0) {
        console.log('Installing plugin(s) from npm ...');
        exec('npm install --save ' + pluginJSON.install.join(' '), {
            cwd: process.cwd()
        }, function(error, stdout, stderr) {
            configure(pluginJSON, callback);
        });
    } else {
        console.log('Nothing to install ...');
    }
}

function configure(pluginJSON, callback) {
    var errors = [];
    console.log('Configuring plugin ...');
    Object.keys(pluginJSON.merge).forEach(function(fileName, index, arr) {
        var configFile = process.cwd() + '/' + fileName;
        var configJSON = JSON.parse(fs.readFileSync(configFile));
        //console.log(configJSON, pluginJSON.merge[fileName]);
        fs.writeFile(configFile, JSON.stringify(merge(configJSON, pluginJSON.merge[fileName]), null, 4), function(err) {
            if(err) {
                errors.push(err);
                return console.log(err);
            } else {
                if (index + 1 === arr.length && errors.length === 0) {
                    if (callback && typeof callback === 'function') {
                        callback(pluginJSON);
                    }
                    console.log('Successfully installed ' + pluginJSON.name + ' plugin! ^_^');
                }
            }
        });   
    });
}

function preInstall(pluginJSON, callback) {
    if (pluginJSON.questions && pluginJSON.questions.length > 0) {
        inquirer.prompt(pluginJSON.questions, function(answers) {
            pluginJSON.answers = answers;
            var newPluginJSON = JSON.parse(_.template(JSON.stringify(pluginJSON))(pluginJSON));
            install(newPluginJSON, callback);
        });
    } else {
        install(pluginJSON, callback);
    }
}

function checkDependencies(pluginDir, pluginJSON, callback) {
    if (pluginJSON.dependencies && pluginJSON.dependencies.length > 0) {
        pluginJSON.dependencies.forEach(function(dependency, index, arr) {
            var dependencyJSON = JSON.parse(fs.readFileSync(pluginDir + dependency + '.json'));
            pluginJSON = dependencyMerge(dependencyJSON, pluginJSON);
            if (pluginJSON.dependencies.length > arr.length) {
                checkDependencies(pluginDir, pluginJSON, callback)
            } else {
                if (index + 1 === arr.length) {
                    preInstall(pluginJSON, callback);
                }
            }
        });
    } else {
        preInstall(pluginJSON, callback);
    }
}

module.exports = function(enjinDir) {
    var pluginDir = enjinDir + '/app/plugins/';
    var pluginName = process.argv[3].toLocaleLowerCase();
    var pluginPath = pluginDir + pluginName + '.json';
    if (fs.existsSync(pluginPath)) {
        var pluginJSON = JSON.parse(fs.readFileSync(pluginPath));
        console.log('Checking for dependencies ...');
        checkDependencies(pluginDir, pluginJSON);
    } else {
        console.log('That plugin doesn\'t exist yet ...');
    }
};