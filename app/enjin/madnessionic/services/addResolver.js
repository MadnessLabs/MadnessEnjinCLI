const rename   = require('gulp-rename');
const template = require('gulp-template');

const capFirstLetter = require('./capFirstLetter');


module.exports = function(name, resolves) {
    var destDir = jsSrcDir + 'resolver';
    gulp.src(tmplDir+'ts/resolver.ts')
        .pipe(template({
            app: appName,
            name: capFirstLetter(name),
            resolves: resolves
        }))
        .pipe(rename(name+'.ts'))
        .pipe(gulp.dest(destDir));
};