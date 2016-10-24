const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('typings install', function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });
};