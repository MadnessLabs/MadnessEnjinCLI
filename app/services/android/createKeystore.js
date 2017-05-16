const exec    = require('child_process').exec;


module.exports = function(environment, input, callback, directory = process.cwd()) {
    if (!input) {
        console.log('At least a keystore password is required to create a new keystore.');
        return false;
    }

    input.name = input.name ? input.name : 'my-release-key.keystore';
    input.alias = input.alias ? input.alias : 'alias_name';
    var keytoolCmd = `keytool -genkey -v -keystore ${input.name} -keypass ${input.password} -alias ${input.alias} -keyalg RSA -keysize 2048 -validity 10000`;

    console.log(keytoolCmd);

    exec(keytoolCmd, {
        cwd: directory
    }, function(error, stdout, stderr) {
        if (!stderr) {
            console.log('Keystore was successfully created...');
        }
        if (callback && typeof callback === 'function') {
            var envFile = `${directory}/enjin.${environment}.json`;
            var envJSON = require(envFile);
            envJSON.android = {
                keystorePassword: input.password
            };
            fs.writeJson(envFile, envJSON, (err) => {
                if (err) return console.error(err)

                console.log(`Keystore password saved to enjin.${environment}.json ...`);
                callback(stderr);
            });
        }
    });
};