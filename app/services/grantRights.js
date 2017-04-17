const exec    = require('child_process').exec;


module.exports = function(user, directory, callback) {
    exec(`chown ${user}:${user} ${directory}`, {cwd: directory }, function(error, stdout, stderr){
        console.log(stdout);
        if (callback && typeof callback === 'function') {
            callback(stdout, stderr);
        }
    });
};