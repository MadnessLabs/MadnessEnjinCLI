const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence(
        'css:minify', 
        'js:minify',
        callback
    );
};