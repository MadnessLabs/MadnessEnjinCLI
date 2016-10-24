const jeditor = require('gulp-json-editor');


module.exports = function(gulp, callback) {
    return gulp.src(tmplDir + 'extension/manifest.json')
        .pipe(jeditor(function(json) {
            json.name = configJSON.extension.name ? configJSON.extension.name : appName;
            json.description = configJSON.extension.description ? configJSON.extension.description : appDesc;
            json.version = configJSON.extension.version;
            json.background = configJSON.extension.background ? configJSON.extension.background : json.background;
            json.content_security_policy = configJSON.extension.content_security_policy ? configJSON.extension.content_security_policy : json.content_security_policy;
            json.permissions = configJSON.extension.permissions ? configJSON.extension.permissions : json.permissions;
            json.browser_action = configJSON.extension.browser_action ? configJSON.extension.browser_action : json.browser_action;
            json.manifest_version = configJSON.extension.manifest_version ? configJSON.extension.manifest_version : json.manifest_version;
            return json; 
        }))
        .pipe(gulp.dest("./extension"));
};