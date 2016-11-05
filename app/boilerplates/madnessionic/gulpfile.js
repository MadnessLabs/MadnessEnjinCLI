 /////////////////////////////////////
// REQUIRED LIBRARIES
fs           = require('fs');
gulp         = require('gulp');
env          = JSON.parse(fs.readFileSync('.env'));
startEnjin   = require(env.enjinPath + '/app/enjin/' + env.type);
taskDir      = env.taskDir ? process.cwd() + '/' + env.taskDir : process.cwd() + '/tasks';

 /////////////////////////////////////
// ON LOAD
startEnjin();

 /////////////////////////////////////
// TASKS
require('gulp-require-tasks')({
    path: env.enjinPath + 'app/enjin/' + env.type + '/tasks',
    gulp: gulp
});

if (fs.existsSync(taskDir)) {
    require('gulp-require-tasks')({
        path: taskDir,
        gulp: gulp
    });
}