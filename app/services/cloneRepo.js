const exec    = require('child_process').exec;
const fs      = require('fs');

const expandGitLink = require('./expandGitLink');


module.exports = function(enjinDir, stack, folderPath, callback) {
    stack = expandGitLink(stack);
    folderPath = folderPath ? folderPath : stack.split('/')[stack.split('/').length - 1];

    console.log('Cloning ' + stack + ' into ' + folderPath + ' ...');
    exec(`git clone ${stack} ${folderPath}`, callback);
};