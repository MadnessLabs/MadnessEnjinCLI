const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const jeditor = require("gulp-json-editor");

const cleanString = require('../../services/cleanString');


module.exports = function(gulp, callback) {
    return gulp.src(tmplDir+'config/sublime.json')
        .pipe(gulpif(!appDebug, jeditor(function(json) {
            json.folders[0].folder_exclude_patterns = json.folders[0].folder_exclude_patterns.concat(['build', 'templates', 'node_modules', 'www']);
            return json; 
        })))
        .pipe(rename(appName+'.sublime-project'))
        .pipe(gulp.dest('./'));
};
