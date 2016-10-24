module.exports = function(gulp, callback) {
    for(var i = 0; i < configJSON.routes.length; i++) {
        var route = configJSON.routes[i];
        var templateParts = route.templateUrl.split('/');
        var pageName = templateParts[templateParts.length - 1].split('.');
        var viewPath = appDir + route.templateUrl;
        var controllerPath = './build/js/page/' + pageName[0] + '.js';
        console.log(viewPath);
        gulp.src(viewPath)
            .pipe(gulp.dest('./extension/html/page'));
        gulp.src(controllerPath)
            .pipe(gulp.dest('./extension/build/js/page'));
        if (i === configJSON.routes.length - 1) {
            callback();
        }
    }
};