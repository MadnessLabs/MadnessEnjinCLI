const rename   = require('gulp-rename');
const template = require('gulp-template');
const npc      = require('copy-paste');


module.exports = function(name) {
    gulp.src(tmplDir+'pug/popover.pug')
        .pipe(template({name: name}))
        .pipe(rename(name+'.pug'))
        .pipe(gulp.dest(htmlSrcDir+'popover/'));
    gulp.src(tmplDir+'scss/popover.scss')
        .pipe(template({name: name}))
        .pipe(rename(name+'.scss'))
        .pipe(gulp.dest(cssSrcDir+'popover/'));

    var copyText = `
        this.$ionicPopover.fromTemplateUrl('html/popover/${name}.html', {
            scope: this.$scope,
            'backdropClickToClose': true
        }).then((popover) => {
            this.popover = popover;
        });
    `;

    npc.copy(copyText);
};