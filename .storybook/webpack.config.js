const path = require('path');
const paths = require('../../../config/paths');

module.exports = {
  module: {
    rules: [
      {
        // For svg icons, we want to get them transformed into React components
        // when we import them.
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: function testForNormalCssFiles(fileName) {
          return fileName.endsWith('.css') && !fileName.endsWith('.mod.css');
        },
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: paths.sourceFolders,
      },
      {
        test: /\.mod\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  sourceFolders: paths.sourceFolders,
                },
              },
            },
          },
        ],
        include: paths.sourceFolders,
      },
    ],
  },
};
