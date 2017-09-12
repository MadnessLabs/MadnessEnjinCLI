const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('ionic cordova run android', function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });
};