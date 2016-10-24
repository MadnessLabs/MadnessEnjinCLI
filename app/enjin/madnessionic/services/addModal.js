const rename   = require('gulp-rename');
const template = require('gulp-template');
const npc      = require('copy-paste');


module.exports = function(name) {
    gulp.src(tmplDir+'pug/modal.pug')
        .pipe(template({name: name}))
        .pipe(rename(name+'.pug'))
        .pipe(gulp.dest(htmlSrcDir+'modal/'));
    gulp.src(tmplDir+'scss/modal.scss')
        .pipe(template({name: name}))
        .pipe(rename(name+'.scss'))
        .pipe(gulp.dest(cssSrcDir+'modal/'));

    var copyText = `
        this.$ionicModal.fromTemplateUrl('html/modal/${name}.html', {
            scope: this.$scope,
            animation: 'slide-in-up',
            backdropClickToClose: true
        }).then((modal) => {
            this.modal = modal;
        });
    `;

    npc.copy(copyText);
};