const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: '#eval-source-map',
    entry: {
        app: './src/index',
        deps: ['react', 'react-dom', 'redux', 'react-redux', 'aphrodite'],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'deps',
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            // allows us to do `const MathQuill = require('mathquill');`
            mathquill: path.join(__dirname, "mathquill/mathquill.js"),
        },
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }, {
            // appends `module.exports = window.MathQuill` to mathquill.js
            test: /[\/]mathquill\.js$/,
            loader: "exports?window.MathQuill",
        }],
    },
};
