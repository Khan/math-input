const webpack = require('webpack');

const config = require('./webpack.config');

// Same plugins as the production config, except:
//  (1) No Uglify minification.
//  (2) No production Node environment (which is used in production to disable
//      React's PropTypes validation).
config.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'deps',
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        __DEV__: true
    }),
];

config.devtool = '#eval-source-map';

module.exports = config;
