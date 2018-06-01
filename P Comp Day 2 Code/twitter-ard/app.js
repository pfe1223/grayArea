//Import Twitter and J5 modules
var Twitter = require('twitter')
var five = require("johnny-five");

// Authenticates with Twitter using the (unofficial) twitter
// package on npm. This is required for using the interesting parts
// of the API, e.g. streaming or posting tweets.
var client = new Twitter({
  consumer_key: 'C6LZpM3yWFMZMEUZmKw6iCzrk',
  consumer_secret: '32XmYzSq1W3HgW56502IWynuDbT8c9nq0J7DExV9NE9KFzmfco',
  access_token_key: '763439881141878784-pm87htKc2Fk8aN6n0T15NmR2mq15hbP',
  access_token_secret: 'baMEqNGPZcVhRG6D3AAroS6ONZavvT5lIpfyYlzSVzJxQ'
})

//set up a new j5 board
var board = new five.Board();
var led;

//make a blink function
function blink() {
  led.pulse(40);

  board.wait(4000, function() {
    led.stop();
  });
}

board.on("ready", function() {
  // Create assign a j5 led on pin 6 to led
  led = new five.Led(6);

  // Creates a realtime streaming connection to the Twitter
  // API, letting you "track" a particular keyword or hashtag
  // and recieve a notification instantly as soon as a tweet is posted.
  //
  // Documentation, including additional parameters you can use, may
  // be found here:
  // https://dev.twitter.com/streaming/reference/post/statuses/filter
  //
  // Note that you can also stream tweets from particular users, or
  // tweets posted from around a particular location

  client.stream('statuses/filter', {
    //track a word
    track: 'Lebron'
  }, function(tweetStream) {


    // `tweetStream` will emit a "data" event whenever
    // a new tweet is posted. These will be in the same format
    // as seen in the first example.
    tweetStream.on('data', function(tweet) {
      console.log(tweet.text);
      blink(led);

    })
  })
});