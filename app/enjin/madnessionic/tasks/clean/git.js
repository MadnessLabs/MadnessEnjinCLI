const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('git reset --hard', function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });
};