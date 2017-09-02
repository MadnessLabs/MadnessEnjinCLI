const exec = require('child_process').exec;

module.exports = function(gulp, callback) {
    exec('npm run build', {cwd: process.cwd() + '/components' }, function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });   
};
