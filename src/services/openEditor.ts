const exec    = require('child_process').exec;


module.exports = function(editor, folderPath) {
    exec(`${editor} .`, {cwd: folderPath}, function(error, stdout, stderr){
        if (error) {
            console.log('Failed to open code editor!');
            return false;
        }
    });
};