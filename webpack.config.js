var package = require('./package.json');

module.exports = {
  entry: {
    'app': './app/app.ts'
  },
  output: {
    path: __dirname + "/webpack",
    filename: '[name].js'
  },
  externals: {
    'angular': 'angular',
    'powerbi-client': "window['powerbi-client']"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}