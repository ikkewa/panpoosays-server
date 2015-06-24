var Twit = require('twit');
var config = require('../../config/config');

var T = new Twit({
  consumer_key: config.twit.consumer_key,
  consumer_secret: config.twit.consumer_secret,
  access_token: config.twit.access_token,
  access_token_secret: config.twit.access_token_secret
});

var stream = T.stream('statuses/filter', { track: config.track });

module.exports = function routes(app, io) {
  bindRoutes(app);

  io.on('connection', function(socket) {
    bindSocketEvents(socket);
  });
};


function bindSocketEvents(socket) {
  function emitTweet(user, msg) {
    socket.emit('tweet', {
      user: user,
      msg: msg
    });
  }

  function tweetDummys() {
    config.initTweets.forEach(function(tweet) {
      emitTweet('@panpoosays', tweet);
    });
  }

  function tweetLive() {
    stream.on('tweet', function (tweet) {
      emitTweet(tweet.user.screen_name || '', tweet.text);
    });
  }


  // if the client wants some old tweets (because he is bored)
  socket.on('last-tweets', tweetDummys);
  socket.on('awaiting-tweets', tweetLive);

  // clean up listeners on disconnect
  socket.on('disconnect', function () {
    stream.removeListener('tweet', tweetLive);
  });
}

function bindRoutes(app) {
  app.get('/', function(req, res) {
    res.send('Server for PanPoo events');
  });
}
