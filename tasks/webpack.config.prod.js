const webpack = require('webpack');
const config = require('./config.js');
const path = require('path');
const baseConfig = require('./webpack.config.common.js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

process.env.BABEL_ENV = 'dev';

module.exports = Object.assign(baseConfig, {
    devtool: 'source-map',
    output: {
        path: config.dist,
        libraryTarget: 'umd',
        library: config.appName,
        filename: path.join(config.outputName + '.min.js'),
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        })
    ]
});
