'use strict';

import { resolve } from 'path';
import { uglify } from 'rollup-plugin-uglify';
import elm from 'rollup-plugin-elm';
import copy from 'rollup-plugin-copy';
import babel from 'rollup-plugin-babel';
import remove from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';

const PRODUCTION = process.env.NODE_ENV === 'production';

function from(root, ...paths) {
    return resolve(__dirname, root, ...paths);
}

function src(...paths) {
    return from('src', ...paths);
}

function dist(...paths) {
    return from('dist', ...paths);
}

export default [{
    input: src('elm', 'Main.elm'),

    plugins: [
        remove({
            targets: [
                dist('*')
            ]
        }),

        copy({
            targets: {
                [src('assets')]: dist(),
            }
        }),

        elm({
            optimize: PRODUCTION,
            debug: !PRODUCTION
        }),

        PRODUCTION && babel({
            extensions: [
                '.elm'
            ]
        }),

        PRODUCTION && uglify({
            compress: {
                pure_funcs: '[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9]',
                pure_getters: true,
                keep_fargs: false,
                unsafe_comps: true,
                unsafe: true,
                passes: 2
            },
            mangle: true,
        }) 
    ],

    output: {
        file: dist('main.js'),
        format: 'iife',
        name: 'Elm'
    }
}, {
    input: src('js', 'index.js'),

    plugins: [
        postcss({
            extract: dist('index.css')
        }),
        PRODUCTION && babel(),
        PRODUCTION && uglify()
    ],
    
    output: {
        file: dist('index.js'),
        format: 'iife'
    }
}];