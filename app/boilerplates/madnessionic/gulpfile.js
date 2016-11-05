 /////////////////////////////////////
// REQUIRED LIBRARIES
fs           = require('fs');
gulp         = require('gulp');
env          = JSON.parse(fs.readFileSync('.env'));
startEnjin   = require(env.enjinPath + '/app/enjin/' + env.type);

 /////////////////////////////////////
// ON LOAD
startEnjin();
taskDir = configJSON.taskDir ? process.cwd() + '/' + configJSON.taskDir : process.cwd() + '/tasks';

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