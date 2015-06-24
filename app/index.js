
var http = require('http');
var path = require('path');
var express = require('express');
var socketio = require('socket.io');

// middleware
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var routes = require('./routes');
var app = module.exports = express();
var server = module.exports = http.createServer(app);
var io = socketio(server);
io.serveClient(false);


// config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// hook up middleware
app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// load the routes before static handle
routes(app, io);

app.use(express.static(path.join(__dirname, '..', 'public')));

if(app.get('env') === 'development') {
  app.use(errorHandler());
}

