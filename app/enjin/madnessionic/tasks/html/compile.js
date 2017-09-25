const pug = require('gulp-pug');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cache  = require('gulp-cached');


module.exports = function(gulp, callback) {
    var errored = false;
    var errorMessage = [];
    var ext = htmlSrcFile.split('.').pop();
    return gulp.src(htmlWatch)
        .pipe(plumber({
            errorHandler: function(error) {
                errored = true;
                console.log(error.message);
                if(global.isWatching && global.synced){
                    errorMessage.push(error.message.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }
                this.emit('end');
            }
        }))
        .pipe(cache('html:compile'))
        .pipe(pug({
            locals: configJSON,
            pretty: true
        }))
        .pipe(rename(function(file){
            if(file.basename+'.'+ext === htmlSrcFile){
                file.basename = 'index';
                file.dirname = '../';
            }
        }))
        .pipe(gulp.dest(htmlDir))
        .on('end', function(){
            if(errored && global.isWatching && global.synced){
                cache.caches = {};
                browserSync.notify("<div style='text-align:left;'>"+errorMessage.join("<hr />")+"</div>", errorTimeout);
            }
        });
};