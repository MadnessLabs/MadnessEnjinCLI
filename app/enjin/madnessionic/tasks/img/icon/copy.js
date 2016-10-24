module.exports = function(gulp, callback) {
    return gulp.src(appIcon)
        .pipe(gulp.dest(imgDir));
};