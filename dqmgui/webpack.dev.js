const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname, 'assets'),
        port: 8084,
        proxy: [{
          context: ['/online-dev'],
          target: 'http://localhost:8070/dqm',
        }],
      }
});
