module.exports = {
    stories: ["../stories/**/*.stories.js"],
    addons: ["@storybook/addon-actions", "@storybook/addon-links"],
    webpackFinal: async (config) => {
        // do mutation to the config
        config.module.rules.push({
            test: /\.less$/,
            use: ["css-loader", "less-loader"],
        });
        return config;
    },
};
