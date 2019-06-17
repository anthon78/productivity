const path = require("path");

module.exports = {
  mode : "production",
  entry: path.join(__dirname, "client/src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.join(__dirname, "node_modules"),
        ],
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          //localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }

}