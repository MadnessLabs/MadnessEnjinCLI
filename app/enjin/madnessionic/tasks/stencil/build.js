const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    exec('npm run stencil', function(error, stdout, stderr) {
        console.log(stdout);
        callback();
    });
};