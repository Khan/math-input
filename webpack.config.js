const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app',
        nativeApp: './src/native-app',
        deps: [
            'prop-types',
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'aphrodite',
            // TODO(kevinb) create a build config for test code
            // 'mathquill',
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // allows us to do `const MathQuill = require('mathquill');`
            mathquill: path.join(__dirname, "mathquill/mathquill.js"),
        },
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|mathquill)/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            // appends `module.exports = window.MathQuill` to mathquill.js
            test: /\/mathquill\.js$/,
            use: {
                loader: "exports-loader?window.MathQuill",
            }   
        }],
    }
};
