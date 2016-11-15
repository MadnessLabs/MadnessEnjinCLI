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

                socket.on('enjin-add-directive', function(data) {
                    console.log(`Adding ${data.name} directive ...`);
                    exec(`gulp add:directive -n ${data.name} -a ${data.attrs} -t ${data.template} -r ${data.restrict}`, process.cwd(), function() {
                        console.log(`${data.name} directive added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-filter', function(data) {
                    console.log(`Adding ${data.name} filter ...`);
                    exec(`gulp add:filter -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} filter added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-modal', function(data) {
                    console.log(`Adding ${data.name} modal ...`);
                    exec(`gulp add:modal -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} modal added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-page', function(data) {
                    console.log(`Adding ${data.name} page ...`);
                    exec(`gulp add:page -n ${data.name} -r ${data.resolves}`, process.cwd(), function() {
                        console.log(`${data.name} page added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-popover', function(data) {
                    console.log(`Adding ${data.name} popover ...`);
                    exec(`gulp add:popover -n ${data.name}`, process.cwd(), function() {
                        console.log(`${data.name} popover added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-resolver', function(data) {
                    console.log(`Adding ${data.name} resolver ...`);
                    exec(`gulp add:resolver -n ${data.name} -r ${data.resolves}`, process.cwd(), function() {
                        console.log(`${data.name} resolver added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-route', function(data) {
                    console.log(`Adding ${data.name} route ...`);
                    exec(`gulp add:route -n ${data.name} -u ${data.url} -t ${data.template} -c ${data.controller} -r ${data.resolver}`, process.cwd(), function() {
                        console.log(`${data.name} route added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-service', function(data) {
                    console.log(`Adding ${data.name} service ...`);
                    exec(`gulp add:service -n ${data.name} -t ${data.type}`, process.cwd(), function() {
                        console.log(`${data.name} service added successfully! ^_^`);
                    });
                });

                socket.on('enjin-add-state', function(data) {
                    console.log(`Adding ${data.name} state ...`);
                    exec(`gulp add:state -n ${data.name} -v ${data.view || 'tab'} -r ${data.resolves}`, process.cwd(), function() {
                        console.log(`${data.name} state added successfully! ^_^`);
                    });
                });
            });
        });
    } else {
        console.log('No enjin file found in this directory ... -,-');
    }
};