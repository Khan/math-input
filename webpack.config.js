const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
    ],
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            // "react-dom": "@hot-loader/react-dom",
            mathquill: path.join(__dirname, "mathquill/mathquill.js")
        },
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        liveReload: false,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
};
