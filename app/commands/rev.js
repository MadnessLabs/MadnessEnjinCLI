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
                socket.on('enjin-add-component', function(data) {
                    console.log(`Adding ${data.name} component ...`);
                    exec(`gulp add:component -n ${data.name} -a ${data.attrs} -r ${data.resolves}`, process.cwd(), function() {
                        console.log(`${data.name} component added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-controller', function(data) {
                    console.log(`Adding ${data.name} controller ...`);
                    exec(`gulp add:controller -n ${data.name} -d ${data.dir}`, process.cwd(), function() {
                        console.log(`${data.name} controller added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-modal', function(data) {
                    console.log(`Adding ${data.name} modal ...`);
                    exec(`gulp add:modal -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} modal added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-popover', function(data) {
                    console.log(`Adding ${data.name} popover ...`);
                    exec(`gulp add:popover -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} popover added successfully! ^_^`);
                    });
                });

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