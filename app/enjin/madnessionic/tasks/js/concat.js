const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');


module.exports = function(gulp, callback) {
    var concatArr = jsLib.concat(jsBuild);
    
    return gulp.src(concatArr)
        .pipe(sourcemaps.init())
        .pipe(concat(jsDestFile))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDestDir));
};