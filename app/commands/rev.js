const exec     = require('child_process').exec;
const fs       = require('fs');
const bs       = require('browser-sync').create();


module.exports = function(enjinDir) {
    try {
        var enjinJSON = JSON.parse(fs.readFileSync(process.cwd() + '/enjin.json'));
    } catch(error) {
        console.log('No enjin file found in this directory ... -,-');
        return false;
    }
    if (enjinJSON) {
        bs.init({
            server: enjinDir + '/node_modules/enjinrev/www',
            port: 5227
        }, function(err, bs) {
            bs.io.sockets.on('connection', function(socket) {
                socket.on('enjin-add-page', function(data) {
                    console.log(`Adding ${data.name} page ...`);
                    exec(`gulp add:page -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} page added successfully! ^_^`);
                    });
                });
            });
        });
    } else {
        console.log('No enjin file found in this directory ... -,-');
    }
};