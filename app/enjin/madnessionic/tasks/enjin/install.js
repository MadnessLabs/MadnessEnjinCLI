const runSequence = require('run-sequence').use(gulp);
const addPage = require('../../services/addPage');


module.exports = function(gulp, callback) {
    if (!configJSON.routes.length) {
        addPage('home', []);
    }

    runSequence(
        'clean:install',
        'js:app',
        'config:platform',
        'config:run',
        'config:js', 
        'config:css', 
        'config:ionic',
        'config:cordova', 
        'config:node', 
        'config:sublime',
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