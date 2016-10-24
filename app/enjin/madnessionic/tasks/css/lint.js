const cache       = require('gulp-cached');
const runSequence = require('run-sequence').use(gulp);
const sassLint    = require('gulp-sass-lint');

module.exports = function(gulp, callback) {
    var errorCount   = 0,
        errorMessage = [];
    global.isError = false;
    return gulp.src(cssWatch)
        .pipe(cache('css-lint'))
        .pipe(sassLint())
        .on('error', onError)
        .pipe(sassLint.format())
        .on('end', function(){
            if(!global.isError){
                runSequence('css:compile', 'css:concat');    
            }
        });
};