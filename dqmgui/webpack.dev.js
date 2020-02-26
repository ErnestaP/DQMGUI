const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8084,
    proxy: [
    {
      context: ['/archive', '/samples'],
      target: 'http://localhost:8081/dqm/offline/data/json',
    }
    ],
  }
});
