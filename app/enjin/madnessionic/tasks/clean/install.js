const clean = require('gulp-clean');


module.exports = function(gulp, callback) {
    return gulp.src(['.git/'], {read: false})
    .pipe(clean({force: true}));
};