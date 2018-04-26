//create stage for SVG
let r = new Rune({
  container: "body",
  width: 500,
  height: 400
});

let a = 0; //angle in radians
let centerX = r.width / 2; //x-coord for center of stage
let centerY = r.height / 2; //y-coord for center of stage
let offset = 90; //distance between center of stage and circle
let x = calcPos("sin", a, centerX); //calculate x-pos
let y = calcPos("cos", a, centerY); //calculate y-pos

//Uses polar to Cartesian transformation to calculate x- and y-pos
function calcPos(operation, angle, position) {
  if (operation === "sin") { //calculation for sin
    return Math.sin(Rune.radians(angle)) * offset + position;
  } else if (operation === "cos") { //calculation for cos
    return Math.cos(Rune.radians(angle)) * offset + position;
  }
}

//create circle object
let c1 = r.circle(0, 0, 0)
  .radius(40) //set radius of circle
  .stroke(false) //no stroke
  .fill(63, 154, 130) //fill color
  .move(x, y); //set position of circle

//for every loop...
r.on('update', function() {
  a += 1.2; //increase the angle
  x = calcPos("sin", a, centerX); //recalculate x-pos
  y = calcPos("cos", a, centerY); //recalculate y-pos
  c1.move(x, y); //set new position
});

r.play(); //start animation (loop)