const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');


module.exports = function(gulp, callback) {
    return gulp.src(cssBuild)
        .pipe(sourcemaps.init())
        .pipe(concat(cssDestFile))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestDir))
        .pipe(gulpif(global.isWatching, browserSync.stream()));
};