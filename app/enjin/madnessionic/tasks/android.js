const runSequence = require('run-sequence');


module.exports = function(gulp, callback) {
    runSequence(
        'clean:build', 
        'config:build', 
        'html:template',
        'html:build', 
        'css:build', 
        'js:build',
        'android:run',
        callback
    );
};