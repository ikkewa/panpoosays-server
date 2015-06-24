
var appPath = './app/';

module.exports = {
  appPath: appPath,

  jshint: {
    srcPath: [
      appPath + '**/*.js'
    ]
  },

  express: {
    script: 'server.js',
    srcPath: [
      'server.js',
      appPath + '**/*.js'
    ]
  }
};
