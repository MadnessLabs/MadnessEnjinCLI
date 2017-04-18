const exec    = require('child_process').exec;


module.exports = function(user, directory, callback) {
    exec(`chown ${user}:enjineers ${directory}`, {cwd: directory }, function(error, stdout, stderr){
        if (callback && typeof callback === 'function') {
            callback(stdout, stderr);
        }
    });
};