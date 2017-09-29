const _ = require('lodash');

function containsObjectWithKey(obj, list, key) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i][key] === obj[key]) {
            return true;
        }
    }

    return false;
}

module.exports = function merge() {
    var destination = {},
        sources = [].slice.call( arguments, 0 );
    sources.forEach(function( source ) {
        var prop;
        var toTop = false;

        for ( prop in source ) {
            if ( prop in destination && Array.isArray( destination[ prop ] ) ) {
                if (typeof source[prop][0] === 'object' && (source[prop][0].name || source[prop][0].id)) {
                    var key = source[prop][0].id ? 'id' : 'name';
                    source[prop].forEach(function(obj, index) {
                        if (!containsObjectWithKey(obj, destination[prop], key)) {
                           destination[prop].push(obj);
                        }
                    });
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