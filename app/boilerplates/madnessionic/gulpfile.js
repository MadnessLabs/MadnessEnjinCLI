 /////////////////////////////////////
// REQUIRED LIBRARIES
fs           = require('fs');
gulp         = require('gulp');
env          = JSON.parse(fs.readFileSync('.env'));
startEnjin   = require(env.enjinPath + '/app/enjin/' + env.type);

 /////////////////////////////////////
// ON LOAD
startEnjin();

 /////////////////////////////////////
// TASKS
require('gulp-require-tasks')({
    path: env.enjinPath + 'app/enjin/' + env.type + '/tasks',
    gulp: gulp
});