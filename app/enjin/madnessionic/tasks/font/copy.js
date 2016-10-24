module.exports = function(gulp, callback) {
    return gulp.src(fontWatch)
        .pipe(gulp.dest(fontDir));
};