const clean = require('gulp-clean');


module.exports = function(gulp, callback) {
    return gulp.src(appBuild, {read: false})
        .pipe(clean({force: true}));
};