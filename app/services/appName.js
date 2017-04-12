const cleanString = require('./cleanString');


module.exports = function (string) {
    return cleanString(string).toLowerCase();
};