'use strict';
/*jshint node: true*/

var express = require('express');

var app = express();



app.get('/uhoh.mp3', function (req, res) {
  res.sendFile(__dirname + '/uhoh.mp3');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = app.listen('8585', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Tweetboard listening at http://%s:%s', host, port);
});

var io = require('socket.io').listen(server);



var twitterClient = new require('twitter')(require('./twitter-credentials'));
twitterClient.stream('statuses/filter', {
  track: '#camunity'
},  function(stream){
  stream.on('data', function(tweet) {
    io.emit('tweet', tweet);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
