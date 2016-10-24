const rename   = require('gulp-rename');
const template = require('gulp-template');

const capFirstLetter = require('./capFirstLetter');


module.exports = function(name, dir) {
    var destDir = jsSrcDir + dir + '/';
    gulp.src(tmplDir+'ts/controller.ts')
        .pipe(template({
            app: appName,
            name: capFirstLetter(name)    
        }))
        .pipe(rename(name+'.ts'))
        .pipe(gulp.dest(destDir));
};