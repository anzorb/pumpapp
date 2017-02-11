const config = require('./config.js');
const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /(\.js|jsx)$/,
            enforce: 'pre',
            include: /(src)/,
            use: ['eslint-loader'],
        }, {
            test: /\.(js|jsx)$/,
            include: /(src)/,
            use: 'babel-loader',
        }, {
            test: /\.scss$/,
            include: /(src)/,
            use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        }]
    },
    entry: ['es6-promise/auto', 'isomorphic-fetch', config.entryPoint],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
