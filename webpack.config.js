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
    list: './shared/js/main',
    library: './shared/js/library'
  },
  output: {
    filename: 'public/js/[name].js'
  },
  devtool: 'source-map'
};
