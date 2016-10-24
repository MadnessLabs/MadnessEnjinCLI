const template = require('gulp-template');


module.exports = function(gulp, callback) {
    var imports = "";
    for(var i=0; i < configJSON.css.libraries.length; i++){
        var cssLib = configJSON.css.libraries[i];
        imports += '@import "../../'+cssLib+'";\n';
    }

    return gulp.src(tmplDir+'scss/libraries.scss')
        .pipe(template({'libraries': imports}))
        .pipe(gulp.dest(cssSrcDir));
};