const plumber = require('gulp-plumber');
const runSequence = require('run-sequence').use(gulp);
const cache = require('gulp-cached');
const pug = require('gulp-pug');


module.exports = function(gulp, callback) {
    var errored = false;
    var errorMessage = [];
    var ext = htmlSrcFile.split('.').pop();
    return gulp.src('app/extension/**/*.pug')
        .pipe(plumber({
            errorHandler: function(error) {
                errored = true;
                if(global.isWatching && global.synced){
                    errorMessage.push(error.message.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }
                this.emit('end');
            }
        }))
        .pipe(cache('extension:html'))
        .pipe(pug({
            locals: configJSON,
            pretty: true
        }))
        .pipe(gulp.dest('./extension'))
        .on('end', function(){
            if(!errored && global.isWatching && global.synced){
                runSequence('sync:reload');
            }else if(errored && global.isWatching && global.synced){
                cache.caches = {};
                browserSync.notify("<div style='text-align:left;'>"+errorMessage.join("<hr />")+"</div>", errorTimeout);
            }
        });
};