let t1, t2, t3, t4; //toggle variables
let f1, f2, f3, f4, f5; //fader variables
let b1, b2, b3, b4; //button variables
let b, bg, song, fft, button, w, bands, rings, a, speed;
let sat;
let mic; //microphone variable

console.log("running");

//bind the Express server to the P5 sketch
let socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
  console.log(data[0] + " " + data[1]);
  if (data[0] === "/1/fader1" && data[1] !== null) {
    f1 = map(data[1], 0, 1, 0, 1);
  }
  if (data[0] === "/1/fader2" && data[1] !== null) {
    f2 = map(data[1], 0, 1, 0.01, 1);
  }
  if (data[0] === "/1/fader3" && data[1] !== null) {
    f3 = map(data[1], 0, 1, 4, 14);
  }
  if (data[0] === "/1/fader4" && data[1] !== null) {
    f4 = map(data[1], 0, 1, 0.00125, 500);
  }
  if (data[0] === "/1/fader5" && data[1] !== null) {
    f5 = map(data[1], 0, 1, 0, 255);
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
  if (data[0] === "/1/toggle4" && data[1] !== null) {
    t4 = data[1];
  }
});

// Web Audio Stuff
//set AudioContext class for compatibility
let AudioContext = window.AudioContext || window.webkitAudioContext;

//create audio context
const audioContext = new AudioContext();

//setup master gain
const masterGain = audioContext.createGain();
masterGain.connect(audioContext.destination);
masterGain.gain.value = 0.8;


//setup bus and effects
const compressor = audioContext.createDynamicsCompressor();
// compressor.threshold.value = -30;
// compressor.knee.value = 30;
// compressor.ratio.value = 3;
// compressor.attack.value = .1;
// compressor.release.value = 0.15;
// compressor.reduction = -20;
compressor.connect(masterGain);

const submixGain = audioContext.createGain();
submixGain.connect(compressor);

const effectGain = audioContext.createGain();
effectGain.connect(compressor);

const delay = new Delay({
  audioContext,
  feedback: .8,
  time: .5
});
submixGain.connect(delay.input);
delay.output.connect(effectGain);

const lfo = new LFO({
  audioContext
});
lfo.connect(delay.input.delayTime, 4);
lfo.oscillator.frequency.value = .00125;
lfo.start();

const reverb = new Reverb({
  audioContext,
  url: "impulses/space_2.wav"
});
submixGain.connect(reverb.input);
reverb.output.connect(effectGain);

delay.output.connect(reverb.input);

//setup analyser
const analyser = new Analyser({
  audioContext
});
masterGain.connect(analyser.input);

// let currentSpin = 0;


function connectStream() {

  navigator.getUserMedia({
      audio: true,
      video: false
    },
    function(stream) {
      let input = audioContext.createMediaStreamSource(stream);
      input.connect(submixGain);
    },
    function(e) {
      console.log('No live audio input: ' + e)
    }
  )
}

function setup() {
  createCanvas(850, 850);
  angleMode(DEGREES); //use degrees instead of radians
  bands = 256; //frequency bands to be analyzed by FFT
  rings = 25; //number of rings of color
  a = 0; //angle of rotation
  speed = 0.2; //speed of rotation
  sat = 0; //saturation of colors
  f1 = 1; //set fader 1 to 0 to avoid 'undefined'
  f2 = 0; //set fader 2 to 0 to avoid 'undefined'
  f3 = 4; //set fader 3 to 0 to avoid 'undefined'
  f4 = 0.2; //set fader 4 to 0 to avoid 'undefined'
  f5 = 0; //set fader 4 to 0 to avoid 'undefined'
  
  noFill(); //don't fill rings of color
  strokeWeight(5); //weight of rings
  colorMode(HSB); //use hue, saturation, and brightness

  // Turn on the microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(53);

  //fader 1 controls rate of playback
  if (t1 === 1) {
    delay.input.delayTime.value = f1;
  } else if (t1 === 0) {
    delay.input.delayTime.value = 0.1;
  }

  //fader 2 controls the volume
  if (t2 == 1) {
    delay.output.gain.value = f2;
  } else if (t2 === 0) {
    delay.output.gain.value = 0.01;
  }

  //fader 3 controls the number of rings
  if (t3 == 1) {
    
  } else if (t3 === 0) {
    
  }

  //fader 4 controls the speed of rotation
  if (t4 == 1) {
    lfo.oscillator.frequency.value = f4;
  } else if (t4 === 0) {
    lfo.oscillator.frequency.value = 0.00125;
  }

  let dataArray = analyser.getWaveformData(); //array of FFT value for each band
  translate(width / 2, height / 2); //move to middle of canvas
  //rotate(a); //rotate all the rings
  for (let j = 0; j < rings; j++) { //loop to set color of rings
    let clr = map(j, 0, rings, 0, 255);
    stroke(clr, 255, 255);
    push();
    rotate(a + j * 15);
    beginShape();
    //loop to draw each ring of color
    for (let i = 0; i < dataArray.length; i++) {
      let angle = map(i, 0, dataArray.length, 0, 360);
      let amp = dataArray[i]; //amplitude at each frequency
      let r = map(amp, 0, 128, 15 * j, 15 * j + 50); //distance from center of the canvas
      let x = cos(angle) * r; //x-pos
      let y = sin(angle) * r; //y-pos
      vertex(x, y); //draw a vertex at (x, y)
    }
    endShape(CLOSE); //close the ring of color
    pop();
  } 
  a += speed; //increase angle of rotation
}