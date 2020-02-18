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
      context: ['/offline'],
      target: 'http://localhost:8081/dqm/',
    },
    {
      context: ['offline/data/json/archive'],
      target: 'https://cmsweb.cern.ch/dqm/',
    }
    ],
  }
});
