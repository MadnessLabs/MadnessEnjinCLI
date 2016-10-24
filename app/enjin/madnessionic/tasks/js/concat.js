const strip  = require('gulp-strip-comments');
const concat = require('gulp-concat');


module.exports = function(gulp, callback) {
    var concatArr = jsLib.concat(jsBuild);
    return gulp.src(concatArr)
        .pipe(strip())
        .pipe(concat(jsDestFile))
        .pipe(gulp.dest(jsDestDir));
};