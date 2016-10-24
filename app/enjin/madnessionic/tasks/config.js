const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence(
        'js:app',  
        'config:js', 
        'config:css',
        callback
    );
};