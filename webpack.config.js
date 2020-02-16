const path = require('path');

module.exports = {
  entry: './public/javascripts/source/tetris.js',
  output: {
    filename: 'tetris.core.js',
    path: path.resolve(__dirname, './public/javascripts')
  }
}