const runSequence = require('run-sequence').use(gulp);
const addPage = require('../services/addPage');


module.exports = function(gulp, callback) {
    if (!configJSON.routes.length) {
        addPage('home', []);
    }

    runSequence(
        'clean:build',
        'js:app',  
        'config:js', 
        'config:css', 
        'config:node',
        'typings',
        'font:copy',
        'img:icon:favorite',
        'img:icon:copy', 
        'router',
        'html:template',
        'html:build', 
        'css:import', 
        'css:libraries',  
        'css:compile', 
        'css:concat', 
        'js:compile', 
        'js:concat',
        'workbox',
        callback
    );
};