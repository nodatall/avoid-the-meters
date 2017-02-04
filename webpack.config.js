require('dotenv').config()

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './public/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  externals: {
    'Config': JSON.stringify({
      google_api_key: process.env.GOOGLE_API_KEY
    })
  }
}
