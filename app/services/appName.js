const cleanString = require('./cleanString');


module.exports = function (string) {
    return cleanString(string.toLowerCase().charAt(0).toUpperCase() + string.slice(1));
};