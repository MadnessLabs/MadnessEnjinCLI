const jeditor  = require("gulp-json-editor");
const runSequence = require("run-sequence");

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
    
    setTimeout(function(){
        runSequence('router', 'js:build', 'sync:reload');
    }, 2000);
};