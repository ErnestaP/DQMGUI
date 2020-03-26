const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            DQMGUI_URL: JSON.stringify(env.DQMGUI_URL),
        }),
    ],
});
