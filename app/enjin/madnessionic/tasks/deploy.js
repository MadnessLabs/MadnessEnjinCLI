const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('gulp build --e=' + deploy.env, function(error, stdout, stderr) {
        console.log(stdout);
        exec('ionic upload --note "' + deploy.note + '" --deploy ' + deploy.branch, function(error, stdout, stderr) {
            console.log(stdout);
            callback();
        });
    });
};