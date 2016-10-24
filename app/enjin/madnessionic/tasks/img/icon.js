const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence(
        'img:icon:favorite', 
        'img:icon:copy', 
        'html:template'
    ); 
};