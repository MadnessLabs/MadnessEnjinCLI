const sass = require('gulp-sass')


module.exports = function(gulp, callback) {
    return gulp.src(cssSrcDir+'libraries.scss')
        .pipe(sass())
        .pipe(gulp.dest(cssBuildDir));
};