const ngConfig = require('gulp-ng-config');
const jeditor = require("gulp-json-editor");
const rename = require('gulp-rename');

const merge = require('../../services/merge');


module.exports = function(gulp, callback) {
    return gulp.src(configFile)
        .pipe(jeditor(function(json) {
            json = merge(json, env);
            return {'enjin': json};
        }))
        .pipe(ngConfig(appName+'.config'))
        .pipe(rename('config.js'))
        .pipe(gulp.dest(jsBuildDir));
};