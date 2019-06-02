'use strict';

module.exports = function(context) {
    console.log(context);
    return {
        plugins: [
            require('autoprefixer'),
            context.env === 'production' && require('cssnano')
        ]
    }
};