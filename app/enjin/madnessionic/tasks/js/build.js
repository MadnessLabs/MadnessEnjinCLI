const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    return runSequence(
        'config:js', 
        //'js:lint', 
        'js:compile', 
        'js:concat',
        callback
    );
};