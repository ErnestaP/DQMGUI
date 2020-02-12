const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            REALM: JSON.stringify(process.env.REALM),
            DQMGUI_URL: JSON.stringify(process.env.DQMGUI_URL),
        }),
    ],
});
