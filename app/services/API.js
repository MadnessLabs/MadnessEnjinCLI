var unirest = require('unirest');
const path = require('path');
const nconf = require('nconf');
const slash   = require('slash');
const enjinDir = slash(path.resolve(__dirname, '..', '..'));


module.exports = function(method, endpoint, data = {}, callback, token) {
    if (method.toLowerCase() !== 'get' && method.toLowerCase() !== 'post' && method.toLowerCase() !== 'post' && method.toLowerCase() !== 'patch' && method.toLowerCase() !== 'delete') {
        console.log('Invalid Method used with API...');
        return false;
    }

    nconf.argv()
        .env()
        .file({ file: `${enjinDir}/enjin.json` });

    var currentUser = nconf.get('user');

    var headers = {
        "Content-Type": "application/json",
        "Authorization": token ? token : currentUser ? currentUser.token : null 
    };

    var restUrl = `http://api.madnessenjin.net/v1/${endpoint}`;

    unirest[method.toLowerCase()](restUrl).headers(headers).send(data).end(function(response) {
        if (callback && typeof callback === 'function') {
            if (response.body.success) {
                callback(response.body.data);
            } else {
                console.log(`Error talking to API: ${response.body.error ? response.body.error : response.body.data}`);
                return false;
            }
        } else {
            console.log('Callback must be a valid function...');
            return false;
        }
    });
};