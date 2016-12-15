module.exports = function(gulp, callback) {
    gulp.src(htmlDir + 'directive/**/*.html')
        .pipe(gulp.dest('./extension/html/directive'));
    gulp.src(htmlDir + 'state/**/*.html')
        .pipe(gulp.dest('./extension/html/state'));
    for(var i = 0; i < configJSON.extension.routes.length; i++) {
        var route = configJSON.extension.routes[i];
        var templateParts = route.templateUrl.split('/');
        var pageName = templateParts[templateParts.length - 1].split('.');
        var viewPath = appDir + route.templateUrl;
        var controllerPath = './build/js/page/' + pageName[0] + '.js';
        gulp.src(viewPath)
            .pipe(gulp.dest('./extension/html/page'));
        gulp.src(controllerPath)
            .pipe(gulp.dest('./extension/build/page'));
        if (i === configJSON.extension.routes.length - 1) {
            callback();
        }
    }
};