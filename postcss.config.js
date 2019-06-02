'use strict';

module.exports = function(context) {
    return {
        plugins: [
            require('autoprefixer'),
            context.env === 'production' && require('cssnano')
        ]
    }
};