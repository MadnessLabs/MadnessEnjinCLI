const concat = require('gulp-concat');
const gulpif = require('gulp-if');


module.exports = function(gulp, callback) {
    return gulp.src(cssBuild)
        .pipe(concat(cssDestFile))
        .pipe(gulp.dest(cssDestDir))
        .pipe(gulpif(global.isWatching, browserSync.stream()));
};