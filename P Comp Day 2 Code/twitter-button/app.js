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


//nice date format function
function getDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  var str = date.getFullYear() + "-" + month + "-" + day + "_" + hour + ":" + min + ":" + sec;

  return str;
}

//set up a new j5 board
var board = new five.Board();


board.on("ready", function() {

  button = new five.Button({
    pin: 2,
    isPullup: true
  });

  button.on("press", function() {
    var time = Date.now();
    client.post('statuses/update', {
      status: '@mhellar_bot Push your button! '
    }, function(err, tweets) {
      if (err) throw new Error(err[0].message)
      console.log('Tweeted successfully!')
    });
  });
});