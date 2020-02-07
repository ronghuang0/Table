module.exports = {
  devtool: 'source-map',
  stats: {
    modules: false,
    warnings: false,
  },
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
