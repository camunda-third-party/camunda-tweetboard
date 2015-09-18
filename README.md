# tweetboard

A dead simple tweetboard used for the Camunda Community Day on
17th September 2015 in the Camunda headquarters.

## Instalation


Ohhhhhh c'mon...

`git clone` `npm i` and all that stuff,

1st hint: search and replace

2nd hind: create file looking like:

```js
'use strict';
/*jshint node: true*/
module.exports = {
  consumer_key:
    process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:
    process.env.TWITTER_CONSUMER_SECRET,
  access_token_key:
    process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret:
    process.env.TWITTER_ACCESS_TOKEN_SECRET
};
```

# License

Sure, there's one, it's MIT