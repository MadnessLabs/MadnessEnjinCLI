const exec    = require('child_process').exec;


module.exports = function(folderPath, callback) {
    console.log('Now installing ...');
    exec('npm install', {cwd: folderPath}, function(error, stdout, stderr){
        if (error) {
            console.log('Failed to run npm install!');
            return false;
        }
        if (!error && callback && typeof callback === 'function') {
            callback(stdout);
        }
    });
};