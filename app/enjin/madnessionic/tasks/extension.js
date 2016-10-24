const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence('extension:build', 'extension:watch', callback);
};