const exec    = require('child_process').exec;


module.exports = function(callback, directory = process.cwd()) {
    console.log('Adding Android platform to project...');
    exec(`cordova platform add android`, {
        cwd: directory
    }, function(error, stdout, stderr) {
        exec(`ionic state restore`, {
            cwd: directory
        }, function(error, stdout, stderr) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    });
};