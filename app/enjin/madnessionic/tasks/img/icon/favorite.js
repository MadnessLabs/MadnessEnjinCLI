const favicons = require('favicons');


module.exports = function(gulp, callback) {
    var configuration = {
        appName: appName,
        appDescription: appDesc,
        background: "#fff",
        url: appUrl,
        path: '/img/icon/',
        version: appVersion,
        logging: true,
        html: htmlSrcDir+'favicon.pug'
    };

    favicons(appIcon, configuration, function() { 
        callback();
    });  
};