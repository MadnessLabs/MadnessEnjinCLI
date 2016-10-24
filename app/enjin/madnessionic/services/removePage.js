const clean    = require('gulp-clean');
const jeditor  = require("gulp-json-editor");
const runSequence = require("run-sequence");
const fs          = require('fs');


module.exports = function(name) {
    var newRoutes = appRoutes;
    for(var i=0; i < newRoutes.length; i++){
        var route = newRoutes[i];
        if(route.state === name){
            newRoutes.splice(i,1);
            gulp.src(configFile)
                .pipe(jeditor(function(json) {
                    json.routes = newRoutes;
                    return json; 
                }))
                .pipe(gulp.dest("./"));
        }
    }

    gulp.src([
        cssSrcDir+'page/'+name+'.scss',
        htmlSrcDir+'page/'+name+'.pug',
        htmlDir+'page/'+name+'.html',
        jsSrcDir+'page/'+name+'.ts'
    ],{
        read: false
    })
    .pipe(clean({force: true}));
    
    setTimeout(function(){
        runSequence('router', 'js:build', 'sync:reload');
    }, 2000);
};