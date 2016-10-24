const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence(
        'html:lint', 
        'css-lint', 
        'js:lint',
        callback
    );
};