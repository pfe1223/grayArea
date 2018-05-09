
# Rune.js

From the Rune [website](http://runemadsen.github.io/rune.js/):
>Rune.js is a JavaScript library for programming graphic design
>systems with SVG in both the browser or node.js. It features a
>chainable drawing API, an unobtrusive scene graph, and a range of
>features aimed specifically at graphic designers: native support
>for color conversion, grid systems, typography, pixel iteration,
>as well as an expanding set of computational geometry helpers.

For use in the browser, download the [library](https://github.com/runemadsen/rune.js/releases/tag/1.1.4). Use the [NPM](https://www.npmjs.com/package/rune.js) for Node.

## Setup
Setting up Rune is just like P5, link to the library in `<head>` and link to the JS file in `<body>`. You even use `sketch.js`.

~~~ javascript
<head>
  <script type="text/javascript" src="rune.js"></script>
</head>
~~~

~~~ javascript
<body>
  <script type="text/javascript" src="sketch.js"></script>
</body>
~~~

## Skeleton Program
A basic sketch in Rune looks something like this:

~~~ javascript
let r = new Rune({
  container: "body",
  width: 500,
  height: 400
});
~~~

`r` is a Rune object. Since Rune is going to create an SVG, the `container` is the DOM element that will contain the SVG. `width` and `height` describe the size of the SVG.

## Adding Objects to Rune
Rune include several basic shapes like `ellipse`, `circle`, `line`, `rect`, and `triangle`.

~~~ javascript
r.line(0, 0, 100, 100);

r.rect(0, 0, 100, 50);

r.ellipse(0, 0, 100, 50);

r.circle(0, 0, 100);

r.triangle(0, 0, 100, 0, 100, 100);
~~~

## Chainable Syntax
Rune has a chainable syntax, which means several methods can be linked to one one Rune object. Some Rune objects, like `polygon` require the chain syntax since the polygon requires a series of y and y coordinates.

~~~ javascript
r.polygon(0, 0)
  .lineTo(100, 0)
  .lineTo(100, 100)
  .lineTo(0, 100);
~~~

The chainable syntax can be used to describe the various attributes that make up a Rune object. The code below would create a rectangle that is moved to location (100, 100), filled with the color blue, and rotated 45 degrees.

~~~ javascript
r.rect(0, 0, 50, 50)
  .move(100, 100)
  .fill(0, 0, 255)
  .rotate(45);
~~~

## Rune Examples

# Add Rune 1 Script

~~~ javascript
//create stage for SVG
let r = new Rune({
  container: "body",
  width: 500,
  height: 400
});

//loop to make 250 circles
for (let i = 0; i < 250; i++){
  //create Rune object with random location and color
  r.circle(0, 0, 50)
  	.stroke(false)
  	.move(Rune.random(r.width), Rune.random(r.height))
  	.fill(Rune.random(255), Rune.random(255), Rune.random(255), 0.5);
}

r.draw(); //draw the SVG (one time, not a loop)
~~~

# Add Rune 2 Script

~~~ javascript
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

r.play(); //start the animation
~~~
# Add Rune 3 Script
~~~ javascript
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
~~~
