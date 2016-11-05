const _ = require('lodash');


module.exports = function merge() {
    var destination = {},
        sources = [].slice.call( arguments, 0 );
    sources.forEach(function( source ) {
        var prop;
        var toTop = false;

        for ( prop in source ) {
            if (prop.indexOf('^') > 0) {
                toTop = true;
                prop = prop.slice(0, -1);
            }
            if ( prop in destination && Array.isArray( destination[ prop ] ) ) {
                if (toTop) {
                    destination[ prop ] = _.union(source[ prop + '^' ], destination[prop]);
                    toTop = false;
                } else {
                    destination[ prop ] = _.union(destination[prop], source[ prop ]);
                }
            } else if ( prop in destination && typeof destination[ prop ] === "object" ) {
                destination[ prop ] = merge( destination[ prop ], source[ prop ] );
            } else {
                destination[ prop ] = source[ prop ];
            }
        }
    });
    return destination;
};