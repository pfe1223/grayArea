let bart = require('bart').createClient();

bart.on('24th', function(estimates) {
  console.log("station is: " + estimates[0].station + " next train headed: " + estimates[0].direction + " in: " + estimates[0].minutes + " minutes.");
});