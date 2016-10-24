const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('ionic run android', function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });
};