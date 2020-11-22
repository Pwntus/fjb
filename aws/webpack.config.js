const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  node: {
    __dirname: false // To get correct absolute path w/ SLS
  },
  plugins: [],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: true
  },
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      // '@': path.join(__dirname, 'lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
}
