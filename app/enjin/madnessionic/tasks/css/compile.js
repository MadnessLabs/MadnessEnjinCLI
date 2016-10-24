const sass = require('gulp-sass');
const plumber = require('gulp-plumber');


module.exports = function(gulp, callback) {
    return gulp.src(cssWatch)
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest(cssBuildDir));
};