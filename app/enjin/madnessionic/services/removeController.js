const clean    = require('gulp-clean');
const runSequence  = require('run-sequence').use(gulp);

module.exports = function(name, dir) {
    dir = dir ? dir : 'controller' ;
    gulp.src([
        jsSrcDir+ dir + '/'+name+'.ts'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
    
    setTimeout(function(){
        runSequence('router', 'js:build', 'sync:reload');
    }, 2000);
};