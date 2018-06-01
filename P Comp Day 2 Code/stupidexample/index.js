let five = require('johnny-five');
let twit = require('twit');
let board = new five.Board();

board.on("ready", () => {
  console.log("The board is ready");
  let led = new five.Led(6);
  led.pulse(1500);
});