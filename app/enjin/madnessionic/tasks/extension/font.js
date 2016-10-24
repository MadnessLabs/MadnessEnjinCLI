const runSequence = require('run-sequence').use(gulp);


module.exports = function(gulp, callback) {
    return gulp.src(fontWatch)
        .pipe(gulp.dest('extension/fonts'));
};