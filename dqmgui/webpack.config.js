const path = require('path');
const HtmlWebpackConfig = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    devtool: 'source-map',
    entry: './app/index.tsx',

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(scss|css)?$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(gif|png|mp3|ogg|ico|ttf|ttc|eot|svg|woff|woff2)?$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackConfig({
            title: 'DQMGUI',
            template: 'index.ejs',
        }),
    ],
};
