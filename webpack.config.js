var webpack = require('webpack');

module.exports = {
  entry: {
    'app': "./app/app.js",
    'angular2': [
      // Angular 2 Deps
      'zone.js',
      'reflect-metadata',
      'rtts_assert/rtts_assert',
      'angular2/angular2'
    ]
  },
  output: {
    path: __dirname,
    filename: "www/script.js"
  },
  resolve: {
    modulesDirectories: [
      'lib/ionic',
      'node_modules'
    ],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("angular2", "angular2.js")
  ]
};
