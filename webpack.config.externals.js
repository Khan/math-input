const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'math-input.js',
        library: 'math-input',
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|mathquill)/,
                use: ["babel-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: ["file-loader"],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "math-input.css",
        }),
    ],
    // TODO(alex): Pick just one type below, e.g. commonjs2
    externals: {
        'prop-types': {
            commonjs: 'prop-types',
            commonjs2: 'prop-types',
            amd: 'prop-types',
        },
        'react': {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
        },
        'react-addons-css-transition-group': {
            commonjs: 'react-addons-css-transition-group',
            commonjs2: 'react-addons-css-transition-group',
            amd: 'react-addons-css-transition-group',
        },
        'react-redux': {
            commonjs: 'react-redux',
            commonjs2: 'react-redux',
            amd: 'react-redux',
        },
        'redux': {
            commonjs: 'redux',
            commonjs2: 'redux',
            amd: 'redux',
        },
        'aphrodite': {
            commonjs: 'aphrodite',
            commonjs2: 'aphrodite',
            amd: 'aphrodite',
        },
        'jquery': {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
        },
        'mathquill': {
            commonjs: 'mathquill',
            commonjs2: 'mathquill',
            amd: 'mathquill',
        },
        'katex': {
            commonjs: 'katex',
            commonjs2: 'katex',
            amd: 'katex',
        },
    },
};
