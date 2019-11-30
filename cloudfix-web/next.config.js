const withPlugins = require('next-compose-plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// const nextEnv = require('next-env');
// const dotenvLoad = require('dotenv-load');

// dotenvLoad();
// const withNextEnv = nextEnv();

//Configure webpack plugins
const nextConfigurations = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /.s?css$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                'css-loader',
                'sass-loader'
            ]
        });

        config.module.rules.push({
            test: /\.(jpe?g|woff|woff2|eot|ttf|png|svg|gif|ico|webp)$/,
            use: [
              {
                loader: require.resolve("url-loader"),
                options: {
                  fallback: require.resolve("file-loader"),
                  limit: true,
                  publicPath: `/images/`,
                  outputPath: `static/images/`,
                  name: "[name]-[hash].[ext]"
                }
              }
            ]
          });

        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name]__[hash].css'
            }),
        );
        
        config.plugins.push(
            new Dotenv(),
        )

        return config;
    }

}

module.exports = withPlugins([
    // [withNextEnv],
    // [withImages],
], {
    ...nextConfigurations,
    distDir: '../dist',
});
