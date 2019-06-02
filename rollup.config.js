'use strict';

import { resolve } from 'path';
import { uglify } from 'rollup-plugin-uglify';
import elm from 'rollup-plugin-elm';
import copy from 'rollup-plugin-copy';
import babel from 'rollup-plugin-babel';
import remove from 'rollup-plugin-delete';

const PRODUCTION = process.env.NODE_ENV === 'production';

export default [{
    input: resolve(__dirname, 'src', 'elm', 'Main.elm'),

    plugins: [
        remove({
            targets: [
                resolve(__dirname, 'dist', '*')
            ]
        }),

        copy({
            targets: {
                [resolve(__dirname, 'src', 'assets')]: resolve(__dirname, 'dist'),
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
        file: resolve(__dirname, 'dist', 'main.js'),
        format: 'iife',
        name: 'Elm'
    }
}, {
    input: resolve(__dirname, 'src', 'js', 'index.js'),

    plugins: [
        PRODUCTION && babel(),
        PRODUCTION && uglify()
    ],
    
    output: {
        file: resolve(__dirname, 'dist', 'index.js'),
        format: 'iife'
    }
}];