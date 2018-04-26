//create stage for SVG
var r = new Rune({
  container: "body",
  width: 500,
  height: 400
});

let speed = 2; //degress of rotation
let boxes = []; //empty array for the boxes

for (let i = 0; i < 20; i++) {
  let x = Rune.random(-500, -100); //random x-pos off the stage
  let y = Rune.random(r.height); //random y-pos
  let rd = Rune.random(255); //random value for red
  let grn = Rune.random(255); //random value for green
  let ble = Rune.random(255); //random value for blue
  //make Rune rectangle object with above characteristics
  let box = r.rect(x, y, 100, 100)
    .fill(rd, grn, ble, 0.3)
    .stroke(false)
    .round(20);
  boxes.push(box); //add Rune object to array
}

//Event listener for update, similar to draw in P5
r.on('update', function() {
  //loop through array of Rune objexts
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].move(speed, 0, true); //move Rune object to the right
    //if Rune object off stage, reset position
    //will have a new random y-pos
    if (boxes[i].state.x > r.width) {
      boxes[i].move(Rune.random(-500, -100), Rune.random(r.height));
    }
  }
});

r.play(); //start the animation (loop)