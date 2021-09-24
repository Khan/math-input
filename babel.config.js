module.exports = {
    presets: ["@babel/preset-react", "@babel/preset-env", "@babel/preset-flow"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-template-literals",
    ],
    env: {
        production: {
            presets: [
                "@babel/preset-react",
                "@babel/preset-env",
                "@babel/preset-flow",
            ],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-template-literals",
                "transform-react-remove-prop-types",
            ],
        },
    },
};
