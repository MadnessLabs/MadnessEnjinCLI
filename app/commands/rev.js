const exec     = require('child_process').exec;
const fs       = require('fs-extra');
const bs       = require('browser-sync').create();


module.exports = function(enjinDir) {

    try {
        var enjinJSON = JSON.parse(fs.readFileSync(process.cwd() + '/enjin.json'));
    } catch(error) {
        console.log('No enjin file found in this directory ... -,-');
        return false;
    }

    if (enjinJSON) {
        var fromPath = enjinDir + '/node_modules/enjinrev/www/js/enjin.js';
        var toPath = process.cwd() + '/' + enjinJSON.root + enjinJSON.js.dir + 'enjin.js';
        fs.copy(fromPath, toPath, function(err){
            if(err){
                console.log(err);
            } else {
                bs.init({
                    server: enjinDir + '/node_modules/enjinrev/www',
                    port: 5227,
                    snippetOptions: {            
                        // Provide a custom Regex for inserting the snippet.
                        rule: {
                            match: /<\/body>/i,
                            fn: function (snippet, match) {
                                return snippet + '<script>var ENJIN_JSON = ' + JSON.stringify(enjinJSON) + ';</script>' + match;
                            }
                        }
                    }      
                }, function(err, bs) {
                    bs.io.sockets.on('connection', function(socket) {
                        socket.on('enjin-add-component', function(data) {
                            console.log(`Adding ${data.name} component ...`);
                            var command = `gulp add:component -n ${data.name}`;
                            if (data.attrs) {
                                command += ` -a ${data.attrs}`;
                            }
                            if (data.resolves) {
                                command += ` -r ${data.resolves}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} component added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-controller', function(data) {
                            console.log(`Adding ${data.name} controller ...`);
                            var command = `gulp add:controller -n ${data.name}`;
                            if (data.dir) {
                                command += ` -d ${data.dir}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} controller added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-directive', function(data) {
                            console.log(`Adding ${data.name} directive ...`);
                            var command = `gulp add:directive -n ${data.name}`;
                            if (data.attrs) {
                                command += ` -a ${data.attrs}`;
                            }
                            if (data.template) {
                                command += ` -t ${data.template}`;
                            }
                            if (data.restrict) {
                                command += ` -r ${data.restrict}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} directive added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-filter', function(data) {
                            console.log(`Adding ${data.name} filter ...`);
                            var command = `gulp add:filter -n ${data.name}`;
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} filter added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-modal', function(data) {
                            console.log(`Adding ${data.name} modal ...`);
                            var command = `gulp add:modal -n ${data.name}`;
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} modal added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-page', function(data) {
                            console.log(`Adding ${data.name} page ...`);
                            var command = `gulp add:page -n ${data.name}`;
                            if (data.resolves) {
                                command += ` -r ${data.resolves}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} page added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-popover', function(data) {
                            console.log(`Adding ${data.name} popover ...`);
                            var command = `gulp add:popover -n ${data.name}`;
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} popover added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-resolver', function(data) {
                            console.log(`Adding ${data.name} resolver ...`);
                            var command = `gulp add:directive -n ${data.name}`;
                            if (data.resolves) {
                                command += ` -r ${data.resolves}`;
                            }
                            console.log('Running Command: ', command);
                            exec(commands, process.cwd(), function() {
                                console.log(`${data.name} resolver added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-route', function(data) {
                            console.log(`Adding ${data.name} route ...`);
                            var command = `gulp add:route -n ${data.name}`;
                            if (data.url) {
                                command += ` -u ${data.url}`;
                            }
                            if (data.template) {
                                command += ` -t ${data.template}`;
                            }
                            if (data.controller) {
                                command += ` -c ${data.controller}`;
                            }
                            if (data.resolver) {
                                command += ` -r ${data.resolver}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} route added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-service', function(data) {
                            console.log(`Adding ${data.name} service ...`);
                            var command = `gulp add:service -n ${data.name}`;
                            if (data.type) {
                                command += ` -t ${data.type}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} service added successfully! ^_^`);
                            });
                        });

                        socket.on('enjin-add-state', function(data) {
                            console.log(`Adding ${data.name} state ...`);
                            var command = `gulp add:state -n ${data.name}`;
                            if (data.view) {
                                command += ` -v ${data.view}`;
                            }
                            if (data.resolves) {
                                command += ` -r ${data.resolves}`;
                            }
                            console.log('Running Command: ', command);
                            exec(command, process.cwd(), function() {
                                console.log(`${data.name} state added successfully! ^_^`);
                            });
                        });
                    });
                });
            }
        });
    } else {
        console.log('No enjin file found in this directory ... -,-');
    }
};