const webpack = require('webpack');

const config = require('./webpack.config');

config.devtool = '#eval-source-map';

module.exports = config;
