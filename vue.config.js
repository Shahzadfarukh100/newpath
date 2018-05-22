const path = require('path');

module.exports = {
  configureWebpack: {
    context: path.join(__dirname, 'client'),
    resolve: {
      alias: {
        '@': path.join(__dirname, 'client/src')
      }
    }
  }
}
