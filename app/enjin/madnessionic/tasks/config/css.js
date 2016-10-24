const jSass = require('gulp-json-sass');
const intercept = require('gulp-intercept');
const rename = require('gulp-rename');


module.exports = function(gulp, callback) {
    return gulp.src(configFile)
        .pipe(intercept(function(file) {
            var json = JSON.parse(file.contents.toString());
            file.contents = new Buffer(JSON.stringify(json.css.vars));
            return file;
        }))
        .pipe(jSass({
          sass: false
        }))
        .pipe(rename('_variables.scss'))
        .pipe(gulp.dest(cssSrcDir));
};