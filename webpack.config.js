const path = require('path');

module.exports = {
  entry: './public/javascripts/source/tetris.js',
  output: {
    filename: 'tetris.core.js',
    path: path.resolve(__dirname, './public/javascripts')
  },
  performance: {
    hints: false
  },
  // optimization: {
  //   splitChunks: {
  //     minSize: 512000,
  //     maxSize: 512000,
  //   }
  // }
}