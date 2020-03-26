const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8084,
    compress: true,
    historyApiFallback: true,
    overlay: true,
    proxy: [
      {
        context: ['/plotfairy', '/data'],
        changeOrigin: true,
        target: 'http://localhost:8081/dqm/dev',
        // target: 'http://localhost:8081/dqm/online-test',
      }
    ],
  }
});
