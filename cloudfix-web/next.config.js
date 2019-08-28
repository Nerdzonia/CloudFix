const withPlugins = require('next-compose-plugins');
// const withImages = require('next-images');
const nextEnv = require('next-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenvload = require('dotenv-load');
dotenvload();
const withNextEnv = nextEnv();

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
        )
        return config;
    }

}

module.exports = withPlugins([
    [withNextEnv],
    // [withImages],
], {
    ...nextConfigurations,
    distDir: '../dist',
});
