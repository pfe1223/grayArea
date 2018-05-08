let w = 720; //width of canvas
let h = 360; //height of canvas
let spacer = 8; //gap between dots
let dotSize = 5; //size of the dots
let bendays = []; //array of benday objects

function setup() {
  createCanvas(w, h);
  noStroke();
  initializeArray(); //set up the benday objects
  drawBackground(); //draw the red dots
  placeBenday(); //cover the red dots
}

//draw the benday objects to the canvas
function placeBenday() {
  //loop through array of objects
  for (let i = 0; i < bendays.length; i++) {
    bendays[i].draw(); //draw objects to the canvas
  }
}

//called when the mouse is dragged
function mouseDragged() {
  //loop through the array backwards
  for (let i = bendays.length - 1; i >= 0; i--) {
    //check to see if mouse is touching benday objects
    if (bendays[i].touching(mouseX, mouseY) && mouseIsPressed) {
      bendays.splice(i, 1); //remove benday object from array
    }
  }
  drawBackground(); //clear the background with red dots
  placeBenday(); //draw the benday objects on the canvas
}

//draws the red dots in offset rows for the background
function drawBackground() {
  background(247, 246, 227);
  let rowNum = 0; //keeps track of the row number
  for (let y = 0; y < h; y += spacer) {
    for (let x = 0; x < w; x += spacer) {
      //even rows are slightly offset to the right
      if (rowNum % 2 == 0) {
        fill(171, 28, 42);
        ellipse(x + spacer / 2, y + spacer / 2, dotSize);
      } else { //odd rows are left aligned
        fill(171, 28, 42);
        ellipse(x, y + spacer / 2, dotSize);
      }
    }
    rowNum++;
  }
}

//initialize the array with benday objects in the same position as the red dots
function initializeArray() {
  let rowNum = 0; //keeps track of the row number
  for (let y = 0; y < h; y += spacer) {
    for (let x = 0; x < w; x += spacer) {
      if (rowNum % 2 == 0) {
        //offset objects to the right
        bendays.push(new Benday(x + spacer / 2, y + spacer / 2));
      } else {
        //align objects to the left
        bendays.push(new Benday(x, y + spacer / 2));
      }
    }
    rowNum++;
  }
}

//benday object
class Benday {
  constructor(x, y) {
    this.x = x; //x-pos of the object
    this.y = y; //y-pos of the object
    this.mouseSize = 8; //"size" of the mouse
    this.size = dotSize + 2; //size of benday object, slightly larger than red dots
    this.color = color(247, 246, 227, 255); //matching background color
  }

  //draw the benday objects to the canvas
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  //checks to see if the mouse (using its larger "size") is touching a benday object
  touching(x, y) {
    return dist(this.x, this.y, x, y) < (this.size / 2 + this.mouseSize / 2);
  }
}