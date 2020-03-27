module.exports = {
    stories: ["../stories/**/*.stories.js", "../src/**/*.stories.js"],
    addons: [
        "@storybook/addon-actions",
        "@storybook/addon-links",
        "@storybook/addon-knobs/register",
        "@storybook/addon-backgrounds/register",
        "@storybook/addon-viewport/register",
    ],
    webpackFinal: async (config) => {
        // do mutation to the config
        config.module.rules.push({
            test: /\.less$/,
            use: ["css-loader", "less-loader"],
        });
        return config;
    },
};
