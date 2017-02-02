const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const intercept = require('gulp-intercept');
const sourcemapConcat = require('inline-sourcemap-concat');
const fs = require('fs');


module.exports = function(gulp, callback) {
    const smConcat = sourcemapConcat.create({sourceRoot: '../../app/scss'});
    return gulp.src(cssBuild)
        .pipe(intercept(function(file) {
            var newContent = smConcat.addFileSource(file.path, file.contents.toString());
            file.contents = new Buffer(newContent);
            return file;
        }))
        .pipe(concat(cssDestFile))
        .pipe(gulp.dest(cssDestDir))
        .pipe(gulpif(global.isWatching, browserSync.stream()))
        .on('end', function() {
            fs.appendFile('./www/css/build.css', smConcat.comment().replace('//#', '/*#') + ' */', function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        });
};