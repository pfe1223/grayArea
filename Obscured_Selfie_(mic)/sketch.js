let obstacles = []; //empty array
let capture; //video capture
let s = 40; //size of obstacle objects
let mic; //mic input

function setup() {
  createCanvas(640, 480);
  for (let columns = 0; columns < width; columns += s) {
    for (let rows = 0; rows < height; rows += s) {
      //create an obstacle object in a grid pattern
      obstacles.push(new Obstacle(columns, rows, s));
    }
  }
  capture = createCapture(VIDEO); //turn on the webcam
  capture.size(width, height); //set the capture to the size of the canvas
  capture.hide(); //hide the capture element
  mic = new p5.AudioIn(audioError); //create audio object
  mic.start(readyMsg, errorMsg); //turn on the mic
}

function readyMsg() {
  console.log("The mic is ready.");
}

function errorMsg() {
  console.log("The mic has a problem.");
}

function audioError() {
  console.log("Can't initialize the mic.");
}

function draw() {
  image(capture, 0, 0); //put the webcam output on the canvas
  let volume = mic.getLevel();
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].fadeOut(volume);
  }
}