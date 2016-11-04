const exec = require('child_process').exec;


module.exports = function(gulp, callback) {
    runSequence(
        'clean:build', 
        'config:build', 
        'html:template',
        'html:build', 
        'css:build', 
        'js:build',
        'ios:build',
        callback
    );
};