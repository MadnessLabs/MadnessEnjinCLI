const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, callback) {
    return gulp.src(cssWatch)
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssBuildDir));
};