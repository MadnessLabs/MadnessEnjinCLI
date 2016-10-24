module.exports = function() {
    global.isError = true;
    console.log(err);
    browserSync.notify(err.message);
    this.emit('end');
};