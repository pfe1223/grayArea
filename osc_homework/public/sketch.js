let x, y, z, tx, ty, t1, t2, t3, f4, b1, b2, b3, b4, b, bg, song, fft, button, w, bands, rings, a, speed;

let socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
  console.log(data[0] + " " + data[1]);
  if (data[0] === "/1/fader1" && data[1] !== null) {
    x = map(data[1], 0, 1, -400, 400);
  }
  if (data[0] === "/1/fader2" && data[1] !== null) {
    y = map(data[1], 0, 1, -400, 400);
  }
  if (data[0] === "/1/fader3" && data[1] !== null) {
    z = map(data[1], 0, 1, -400, 400);
  }
  if (data[0] === "/1/fader4" && data[1] !== null) {
    f4 = map(data[1], 0, 1, 0, 400);
  }
  if (data[0] === "/1/xy" && data[1] !== null) {
    tx = map(data[1], 0, 1, -400, 400);
    ty = map(data[2], 0, 1, -400, 400);
  }
  if (data[0] === "/1/toggle1" && data[1] !== null) {
    t1 = data[1];
  }
  if (data[0] === "/1/toggle2" && data[1] !== null) {
    t2 = data[1];
  }
  if (data[0] === "/1/toggle3" && data[1] !== null) {
    t3 = data[1];
  }
  if (data[0] === "/1/push1" && data[1] !== null) {
    b1 = data[1];
  }
  if (data[0] === "/1/push2" && data[1] !== null) {
    b2 = data[1];
  }
  if (data[0] === "/1/push3" && data[1] !== null) {
    b3 = data[1];
  }
  if (data[0] === "/1/push4" && data[1] !== null) {
    b4 = data[1];
  }

});

function preload() {
  // song = loadSound('music/papertiger.mp3');
  song = loadSound('music/raptoyou.mp3');
  // song = loadSound('music/jbreakfast.mp3');
  // song = loadSound('music/thexx.mp3');
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES); //use degrees instead of radians
  bands = 256; //frequency bands to be analyzed by FFT
  rings = 10; //number of rings of color
  a = 0; //angle of rotation
  speed = 0.2; //speed of rotation
  fft = new p5.FFT(0.9, bands); //create FFT object
  button = createButton('Play/Pause'); //pause button
  button.position(20, 20); //set button position
  button.mousePressed(toggleSong); //callback for pause function
  noFill(); //don't fill rings of color
  strokeWeight(3);
  colorMode(HSB);
  song.loop(); //loop song
}

function draw() {
  background(53);
  let spectrum = fft.analyze(); //array of FFT value for each band
  translate(width / 2, height / 2); //move to middle of canvas
  rotate(a); //rotate all the rings
  for (let j = 0; j < rings; j++) { //loop to set color of rings
    let clr = map(j, 0, rings, 0, 255);
    stroke(clr, 255, 255);
    beginShape();
    //loop to draw each ring of color
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let amp = spectrum[i]; //amplitude at each frequency
      let r = map(amp, 0, 256, 25 * j, 25 * j + 100); //distance from center of the canvas
      let x = cos(angle) * r; //x-pos
      let y = sin(angle) * r; //y-pos
      vertex(x, y); //draw a vertex at (x, y)
    }
    endShape(CLOSE); //close the ring of color
  }
  a += speed; //increase angle of rotation
}