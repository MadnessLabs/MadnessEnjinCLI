const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    return runSequence(
        'vars', 
        'config',
        'router',
        'html:build', 
        'css:build',
        callback
    );
};
