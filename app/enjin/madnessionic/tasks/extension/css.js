const plumber = require('gulp-plumber');
const sass = require('gulp-sass');


module.exports = function(gulp, callback) {
    return gulp.src(['app/extension/**/*.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                browserSync.notify(error.message, errorTimeout);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('extension/css'));
};