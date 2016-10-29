const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    runSequence(
        'js:app',
        'config:js', 
        'config:css', 
        'typings',
        'font:copy',
        'img:icon:favorite',
        'img:icon:copy', 
        'html:template',
        'html:build', 
        'css:import', 
        'css:libraries', 
        'css:compile', 
        'css:concat',  
        'js:compile', 
        'js:concat',
        callback
    );
};