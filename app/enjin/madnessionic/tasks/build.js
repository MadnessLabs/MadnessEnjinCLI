const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    console.log('heelo');
    return runSequence(
        'clean:build', 
        'config:build',
        'html:template', 
        'html:build', 
        'css:build', 
        'js:build', 
        //'minify',
        callback
    );
};