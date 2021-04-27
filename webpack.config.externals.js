const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const terserOptions = require("./terser.js");

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    output: {
        path: path.join(__dirname, "build"),
        filename: "math-input.js",
        library: "math-input",
        libraryTarget: "umd",
    },
    optimization: {
        ...terserOptions,
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "math-input.css",
        }),
    ],
    // TODO(alex): Pick just one type below, e.g. commonjs2
    externals: {
        "prop-types": {
            commonjs: "prop-types",
            commonjs2: "prop-types",
            amd: "prop-types",
        },
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
        },
        "react-transition-group": {
            commonjs: "react-transition-group",
            commonjs2: "react-transition-group",
            amd: "react-transition-group",
        },
        "react-redux": {
            commonjs: "react-redux",
            commonjs2: "react-redux",
            amd: "react-redux",
        },
        redux: {
            commonjs: "redux",
            commonjs2: "redux",
            amd: "redux",
        },
        aphrodite: {
            commonjs: "aphrodite",
            commonjs2: "aphrodite",
            amd: "aphrodite",
        },
        jquery: {
            commonjs: "jquery",
            commonjs2: "jquery",
            amd: "jquery",
        },
        mathquill: {
            commonjs: "mathquill",
            commonjs2: "mathquill",
            amd: "mathquill",
        },
        katex: {
            commonjs: "katex",
            commonjs2: "katex",
            amd: "katex",
        },
        "@khanacademy/wonder-blocks-clickable": {
            commonjs: "@khanacademy/wonder-blocks-clickable",
            commonjs2: "@khanacademy/wonder-blocks-clickable",
            amd: "@khanacademy/wonder-blocks-clickable",
        },
        "@khanacademy/wonder-blocks-core": {
            commonjs: "@khanacademy/wonder-blocks-core",
            commonjs2: "@khanacademy/wonder-blocks-core",
            amd: "@khanacademy/wonder-blocks-core",
        },
        "@khanacademy/wonder-blocks-color": {
            commonjs: "@khanacademy/wonder-blocks-color",
            commonjs2: "@khanacademy/wonder-blocks-color",
            amd: "@khanacademy/wonder-blocks-color",
        },
        "react-router-dom": {
            commonjs: "react-router-dom",
            commonjs2: "react-router-dom",
            amd: "react-router-dom",
        },
    },
};
