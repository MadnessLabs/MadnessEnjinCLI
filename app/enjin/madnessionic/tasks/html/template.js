const pug = require('gulp-pug');
const rename = require('gulp-rename');

module.exports = function(gulp, callback) {
    return gulp.src(htmlSrcDir+htmlSrcFile)
        .pipe(pug({
            locals: configJSON,
            pretty: true
        }))        
        .pipe(rename('index.html'))
        .pipe(gulp.dest(appDir))
        .on('end', function(){
            if(global.isWatching){ browserSync.reload(); }
        });
};