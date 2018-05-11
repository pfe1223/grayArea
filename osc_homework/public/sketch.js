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
  song = loadSound('music/papertiger.mp3');
  // song = loadSound('music/2u.mp3');
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
  angleMode(DEGREES);
  noStroke();
  bands = 256;
  rings = 10;
  a = 0;
  speed = 0.2;
  w = width / bands; //width of the lines drawn on canvas
  fft = new p5.FFT(0.9, bands);
  button = createButton('Play/Pause');
  button.position(20, 20);
  button.mousePressed(toggleSong);
  noFill();
  strokeWeight(3);
  colorMode(HSB);
  song.loop();
}

function draw() {
  background(53);
  let spectrum = fft.analyze();
  translate(width / 2, height / 2);
  rotate(a);
  for (let j = 0; j < rings; j++) {
    let clr = map(j, 0, rings, 0, 255);
    stroke(clr, 255, 255);
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let amp = spectrum[i];
      let r = map(amp, 0, 256, 25 * j, 25 * j + 100);
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  a += speed;
}