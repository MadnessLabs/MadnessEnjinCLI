const clean    = require('gulp-clean');


module.exports = function(name) {
    gulp.src([
        cssSrcDir+'popover/'+name+'.scss',
        htmlSrcDir+'popover/'+name+'.pug',
        htmlDir+'popover/'+name+'.html'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
};