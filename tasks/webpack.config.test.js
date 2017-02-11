const webpack = require('webpack');
const config = require('./config.js');
const path = require('path');
const baseConfig = require('./webpack.config.common.js');

process.env.BABEL_ENV = 'test';

module.exports = {
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader',
        }, {
            test: /\.(html)$/,
            exclude: /(node_modules|bower_components)/,
            use: 'raw-loader',
        }]
    },
    output: {
        path: path.resolve('./tests'),
        libraryTarget: 'umd',
        library: 'tests',
        filename: path.join('tests.bundle.js'),
    },
    entry: ['./tests/dom-tests.js'],
    resolve: {
        extensions: ['.js']
    }
};
