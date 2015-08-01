module.exports = {
  entry: "./app/app.es6",
  output: {
    path: __dirname,
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },
    ]
  },
  resolve: {
    alias: {
      'ionic': 'ionic/es5'
    },
    modulesDirectories: [
      'lib',
      'node_modules'
    ],
    extensions: ['', '.js', '.es6']
  }
};
