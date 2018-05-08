let w = 720; //width of canvas
let h = 360; //height of canvas
let spacer = 8; //gap between dots
let dotSize = 5; //size of the dots
let rowNum = 0; //counts the number of the row
let bendays = []; //array of benday objects

function setup() {
  createCanvas(w, h);
  noStroke();
  initializeArray();
}

function draw() {
  drawBackground();
  //loop through array of objects
  for (let i = 0; i < bendays.length; i++) {
    bendays[i].draw(); //draw objects to the canvas
  }
}

//called when the mouse is dragged
function mouseDragged() {
  //loop through the array
  for (let i = 0; i < bendays.length; i++) {
    //make benday object transparent if the mouse is dragged over the object
    if (bendays[i].touching(mouseX, mouseY) && mouseIsPressed) {
      bendays[i].color = color(247, 246, 227, 0);
    }
  }
}

//draws the red dots in offset rows for the background
function drawBackground() {
  background(247, 246, 227);
  rowNum = 0;
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
    this.x = x;
    this.y = y;
    this.mouseSize = 5; //"size" of the mouse
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