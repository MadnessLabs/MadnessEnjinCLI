const rename   = require('gulp-rename');
const template = require('gulp-template');

const addDirective = require('./addDirective');


module.exports = function(name, attrs, restrict) {
    const nameDashLower = name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

    gulp.src(tmplDir+'pug/directive.pug')
        .pipe(template({name: nameDashLower}))
        .pipe(rename(name+'.pug'))
        .pipe(gulp.dest(htmlSrcDir+'directive/'));
    gulp.src(tmplDir+'scss/directive.scss')
        .pipe(template({name: nameDashLower}))
        .pipe(rename(name+'.scss'))
        .pipe(gulp.dest(cssSrcDir+'directive/'));
    addDirective(name, attrs, true, restrict);
};