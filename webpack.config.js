const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

module.exports = {
    entry: './entrypoint.js',
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    "sass-loader",
                ]
            }

        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'compiled.js',
        publicPath: "/dist/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name]-[hash].min.css`,
        }),
        new HtmlWebpackPlugin(),
        new WebpackManifestPlugin({
            fileName: 'bundle-manifest.json',
        }),
    ],
    mode: 'development'
}
