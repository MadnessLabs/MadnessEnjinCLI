 /////////////////////////////////////
// REQUIRED LIBRARIES
gulp         = require('gulp');
startEnjin   = require('<%= enjinDir %>/app/enjin/<%= enjinType %>');

 /////////////////////////////////////
// ON LOAD
startEnjin();

 /////////////////////////////////////
// TASKS
require('gulp-require-tasks')({
    path: '<%= enjinDir %>/app/enjin/<%= enjinType %>/tasks',
    gulp: gulp
});