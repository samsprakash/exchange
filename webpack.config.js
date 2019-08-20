var path = require('path');
var rs = n => path.resolve('./node_modules/' + n);
var webpack = require('webpack');

module.exports = {
  
  entry: {
    app: ['babel-polyfill', './client/index.jsx'],
  },

  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static/',
    filename: '[name].js'
  },

  debug: true,

  module: {
    loaders: [
      // JSX loader for react app
      { test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: [],
        query: {
          presets: ['react', 'es2015'] } },

      // Style loader for component based stylesheets

      { test: /\.pcss$/,
        loader: 'style-loader!css-loader?sourceMaps!postcss-loader' },

      // Font loaders for fontawesome style files

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff' },

      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader' }
    ],

    noParse: /node_modules\/google-libphonenumber\/dist/
  },

  externals: [],

  postcss: function(webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('autoprefixer')({
        remove: true,
        browsers: ['ie >= 9']
      })
    ];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  resolve: {
    alias: {
      "moment": rs('moment'),
      "react": rs('react'),
      'react-addons-css-transition-group':rs('react-addons-css-transition-group'),
      "react-router": rs('react-router'),
      "object-assign": rs('object-assign')
    },
    extensions: ['', '.js', '.jsx']
  }
};
