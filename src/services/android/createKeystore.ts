const exec    = require('child_process').exec;
const fs      = require('fs-extra');

module.exports = function(environment, input, callback, directory = process.cwd()) {
    if (!input) {
        console.log('At least a keystore password is required to create a new keystore.');
        return false;
    }

    input.name = input.name ? input.name : 'my-release-key.keystore';
    input.alias = input.alias ? input.alias : 'alias_name';
    input.department = input.department ? input.department : '';
    input.author = input.author ? input.author : '';
    input.company = input.company ? input.company : '';
    input.keysize = input.keysize ? input.keysize : '2048';
    input.validity = input.validity ? input.validity : '10000';
    input.country = input.country ? input.country : 'US';
    var keytoolCmd = `keytool -genkeypair -v -keystore ${input.name} -keypass ${input.password} -noprompt -alias ${input.alias} -keyalg RSA -keysize ${input.keysize} -validity ${input.validity} -storepass ${input.password} -dname "CN=${input.author}, OU=${input.department}, O=${input.company}, C=${input.country}"`;

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
                keystore: {
                    name: input.name,
                    alias: input.alias,
                    password: input.password
                }
            };
            fs.writeJson(envFile, envJSON, (err) => {
                if (err) return console.error(err)

                console.log(`Keystore password saved to enjin.${environment}.json ...`);
                callback(stderr);
            });
        }
    });
};