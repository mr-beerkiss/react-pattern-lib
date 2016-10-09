const webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }]
  },
  entry: {
    list: './shared/js/main'
  },
  output: {
    filename: 'public/js/[name].js'
  },
  devtool: 'source-map'
};
