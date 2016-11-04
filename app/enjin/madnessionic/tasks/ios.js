const runSequence = require('run-sequence').use(gulp);


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