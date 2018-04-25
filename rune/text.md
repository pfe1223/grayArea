# Rune.js

From the Rune [website](http://runemadsen.github.io/rune.js/):
>Rune.js is a JavaScript library for programming graphic design
>systems with SVG in both the browser or node.js. It features a
>chainable drawing API, an unobtrusive scene graph, and a range of
>features aimed specifically at graphic designers: native support
>for color conversion, grid systems, typography, pixel iteration,
>as well as an expanding set of computational geometry helpers.

Rune runs either in the browser or in Node. Download the [library](https://github.com/runemadsen/rune.js/releases/tag/1.1.4) for use in the browser or use [NPM](https://www.npmjs.com/package/rune.js) for Node.

## Setup
Setting up Rune is just like P5: link to the library in `<head>` and link to the JS file in `<body>`. You even use `sketch.js`.

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
var r = new Rune({
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

Rune Examples
