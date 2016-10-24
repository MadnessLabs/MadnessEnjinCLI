const strip = require('gulp-strip-comments');
const concat = require('gulp-concat');


module.exports = function(gulp, callback) {
    return gulp.src(configJSON.extension.build.background)
        .pipe(strip())
        .pipe(concat('background.js'))
        .pipe(gulp.dest('./extension/js'));
};