const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    if(global.synced){
        runSequence(
            'js:concat', 
            'sync:reload',
            callback
        );
    }
};