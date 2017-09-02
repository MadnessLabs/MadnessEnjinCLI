const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    return runSequence(
        'clean:build',
        'router',
        'config',
        'html:template',
        'html:build',
        'css:import', 
        'css:libraries', 
        'css:compile', 
        'css:concat',
        'css:minify',
        'components:build',
        'components:copy',
        'js:compile', 
        'js:concat', 
        'js:minify',
        'sync:start', 
        'watch',
        callback
    );
};