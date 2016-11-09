const template = require('gulp-template');


module.exports = function(gulp, callback) {
    var resolves = [];
    var defaultRoute = appEntry;

    for (var i=0; i < appRoutes.length; i++) {
        var route = appRoutes[i];
        if (!defaultRoute) {
            defaultRoute = route.state;
        }
        if (route.resolve) {
            resolves.push(route.resolve);
        }
    }

    return gulp.src(tmplDir+'ts/router.ts')
        .pipe(template({
            app: appName,
            routes: appRoutes,
            defaultRoute: defaultRoute,
            typings: '../typings/index.d.ts'
        }))
        .pipe(gulp.dest(jsSrcDir));
};