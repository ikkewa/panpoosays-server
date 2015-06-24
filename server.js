
var http = require('http');
var server = require('./app');
var config = require('./app/config/config');

server.listen(config.port, function() {
  console.log('Server startet on port ' + config.port + ' at ' + new Date());
});
