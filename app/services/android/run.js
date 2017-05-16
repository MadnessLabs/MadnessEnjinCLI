const exec    = require('child_process').exec;


module.exports = function(callback, directory = process.cwd()) {
    exec(`ionic run android`, {
        cwd: directory
    }, function(error, stdout, stderr) {
        if (!stderr) {
            console.log('App successfully deployed on device or simulator! ^_^');
        }
        if (callback && typeof callback === 'function') {
            callback(stderr);
        }
    });
};