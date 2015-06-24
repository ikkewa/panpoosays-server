
var gulp = require('gulp');
var gls = require('gulp-live-server');
var config = require('../config');

gulp.task('watch', ['build'], function() {
  var server = gls(config.express.script, {}, false);
  server.start();

  gulp.watch(config.express.srcPath, function() {
    server.start.apply(server); // workaround due to lack in gulp-live-server
  });
});
