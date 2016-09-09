'use strict';
/*jshint node: true*/

var express = require('express');
var serveStatic = require('serve-static');
var app = express();
var setup = require('./setup');
var fs = require('fs');
var indexHtml = fs.readFileSync(__dirname + '/index.html', 'utf8').split('__TWEET_TAG__').join(setup.tag);


app.get('/', function (req, res) {
  res.send(indexHtml);
});

app.use('/uhoh.mp3', serveStatic(__dirname + '/uhoh.mp3'));
app.use('/css', serveStatic(__dirname + '/css'));
app.use('/fonts', serveStatic(__dirname + '/fonts'));
app.use('/img', serveStatic(__dirname + '/img'));

app.use(function(err, req, res, next) {
  console.info(err);
  next();
});

var server = app.listen('8585', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Tweetboard listening at http://%s:%s', host, port);
});

var io = require('socket.io').listen(server);

// var cache = {};
var twitterClient = new require('twitter')(setup.credentials);
twitterClient.stream('statuses/filter', {
  track: '#' + setup.tag
},  function(stream){
  stream.on('data', function(tweet) {
    // cache[tweet.id] = tweet;
    io.emit('tweet', tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

// setTimeout(function() {
//   console.info(JSON.stringify(cache));
// }, 5000);
