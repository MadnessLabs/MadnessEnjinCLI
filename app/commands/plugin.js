const exec    = require('child_process').exec;
const _       = require('lodash');
const fs      = require('fs-extra');
var inquirer  = require('inquirer');
const replace = require('replace');

const API = require('../services/API');
const merge   = require('../services/merge');
const dependencyMerge = require('../services/dependencyMerge');
var queue = [];
var currentStep = 0;


function install(pluginJSON, callback) {
    if (pluginJSON.install.length > 0) {
        console.log('Installing plugin(s) from npm ...');
        exec('npm install --save ' + pluginJSON.install.join(' '), {
            cwd: process.cwd()
        }, function(error, stdout, stderr) {
            next(pluginJSON, callback);
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
        fs.writeFile(configFile, JSON.stringify(merge(configJSON, pluginJSON.merge[fileName]), null, 4), function(err) {
            if(err) {
                errors.push(err);
                return console.log(err);
            } else {
                if (index + 1 === arr.length && errors.length === 0) {
                    next(pluginJSON, callback);
                }
            }
        });   
    });
}

function copy(pluginJSON, callback) {
    Object.keys(pluginJSON.copy).forEach(function(from, index, arr) {
        var to = pluginJSON.copy[from];
        console.log(`Copying files from ${from} to ${to} ...`);
        fs.copy(process.cwd() + '/' + from, process.cwd() + '/' + to, function (err) {
            if (index + 1 === arr.length) {
                next(pluginJSON, callback);
            }
        });
    });
}

function render(pluginJSON, callback) {
    console.log('Rendering files ...');
    Object.keys(pluginJSON.render).forEach(function(from, index, arr) {
        var toFile = process.cwd() + '/' + pluginJSON.render[from];
        var fromFile = _.template(fs.readFileSync(from))(pluginJSON);
        fs.writeFile(toFile, fromFile, function(err) {        
            if (index + 1 === arr.length) {
                next(pluginJSON, callback);
            }
        });
    });
}


function preInstall(pluginJSON, callback) {
    if (pluginJSON.questions && pluginJSON.questions.length > 0) {
        inquirer.prompt(pluginJSON.questions, function(answers) {
            pluginJSON.answers = answers;
            install(pluginJSON, callback);
        });
    } else {
        install(pluginJSON, callback);
    }
}

function checkDependencies(plugins, pluginJSON, callback) {
    if (pluginJSON.dependencies && pluginJSON.dependencies.length > 0) {
        pluginJSON.dependencies.forEach(function(dependency, index, arr) {
            var dependencyPlugin = _.filter(plugins, {name: dependency});
            if (dependencyPlugin.length) { 
                pluginJSON = dependencyMerge(dependencyPlugin[0].json, pluginJSON);
                if (pluginJSON.dependencies.length > arr.length) {
                    checkDependencies(plugins, pluginJSON, callback)
                } else {
                    if (index + 1 === arr.length) {
                        preInstall(pluginJSON, callback);
                    }
                }
            }
        });
    } else {
        preInstall(pluginJSON, callback);
    }
}

function finish(pluginJSON, callback) {
    console.log('Installing typings ...');
    exec('typings install', {
        cwd: process.cwd()
    });
    if (callback && typeof callback === 'function') {
        callback(pluginJSON);
    }
    console.log('Successfully installed ' + pluginJSON.name + ' plugin! ^_^');
}

function modify(pluginJSON, callback) {
    console.log('Modifying project files ...');
    pluginJSON.modify.forEach(function(modification, index, arr) {
        replace(modification);
        if (index + 1 === arr.length) {
            next(pluginJSON, callback);
        }
    });
}

function next(pluginJSON, callback) {
    if (queue.length === 0) {
        pluginJSON.enjin = JSON.parse(fs.readFileSync(process.cwd() + '/enjin.json'));
        pluginJSON = JSON.parse(_.template(JSON.stringify(pluginJSON))(pluginJSON));
        if (pluginJSON.copy) {
            queue.push({
                fn: copy
            });
        }
        if (pluginJSON.render) {
            queue.push({
                fn: render
            });
        }
        if (pluginJSON.modify) {
            queue.push({
                fn: modify
            });
        }
        if (pluginJSON.merge) {
            queue.push({
                fn: configure
            });
        }
        queue.push({
           fn : finish 
        });
    }

    var currentQueued = queue[currentStep];
    currentStep = currentStep + 1;
    currentQueued.fn(pluginJSON, callback);
}

function viewPluginList(plugins, callback) {
    var choices = [];
    _.forEach(plugins, function(plugin, index) {
        choices.push({
            name: plugin.name,
            value: plugin
        });
        if (index == plugins.length - 1) {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'plugin',
                    message: 'Which plugin you would like to install?',
                    choices: choices
                }
            ], function(answers) {
                if (callback && typeof callback === 'function') {
                    callback(answers.plugin);
                } 
            });
        }
    });
}

module.exports = function(enjinDir) {
    var pluginName = process.argv[3] ? process.argv[3].toLocaleLowerCase() : false;
    new API('get', 'plugin', {}, (plugins) => {
        if (pluginName) {
            _.forEach(plugins, (plugin, index) => {
                if (plugin.name === pluginName) {
                    checkDependencies(plugins, plugin.json);
                    return false;   
                }
                if (index === plugins.length - 1 && plugin.name !== plugin.name) {
                    console.log(`Could not find ${pluginName} plugin ...`);
                }
            });      
        } else {
            viewPluginList(plugins, function(plugin) {
                checkDependencies(plugins, plugin.json);
            });
        }
    });
};