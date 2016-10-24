const jeditor = require("gulp-json-editor");

const cleanString = require('../../services/cleanString');


module.exports = function(gulp, callback) {
    return gulp.src('package.json')
        .pipe(jeditor(function(json) {
            json.name = cleanString(appName).toLowerCase();
            json.description = appDesc;
            json.version = appVersion;
            json.scripts.postinstall = 'gulp reinstall';
            return json; 
        }))
        .pipe(gulp.dest("./"));
};