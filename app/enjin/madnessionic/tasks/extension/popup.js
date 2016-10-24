const strip = require('gulp-strip-comments');
const concat = require('gulp-concat');


module.exports = function(gulp, callback) {
    return gulp.src(configJSON.extension.build.popup)
        .pipe(strip())
        .pipe(concat('extension.js'))
        .pipe(gulp.dest('./extension/js'));
};