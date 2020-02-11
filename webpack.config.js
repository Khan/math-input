const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/app.js",
    },
    output: {
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|mathquill)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                    }
                ],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            title: "math-toolbox",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            // "react-dom": "@hot-loader/react-dom",
        },
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        liveReload: false,
        contentBase: [
            path.join(__dirname, "dist"),
            path.join(__dirname, 'node_modules/mathquill/build/'),
            path.join(__dirname, 'assets/')
        ],
        compress: true,
        port: 9000,
    },
};
