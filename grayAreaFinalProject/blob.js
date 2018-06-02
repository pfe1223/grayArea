class Blob {
  constructor(resolution) {
    this.resolution = resolution;
    this.x = 10;
    this.y = 10;
    // this.x = floor(random(3, width / this.resolution - 3));
    // this.y = floor(random(3, height / this.resolution - 3))
    this.branches = [];
    this.debug = false;
    this.count = 20;
    this.travel = 5;
    this.r = 30; //radius
    this.maxR = this.r + this.travel;
  }

  display() {
    //see center of the blob
    stroke(155, 0, 155);
    strokeWeight(5);
    point(this.x * this.resolution, this.y * this.resolution);

    if (this.debug === true) {
      stroke(255);
      strokeWeight(5);
      push();
      translate(this.x * this.resolution, this.y * this.resolution);
      for (let i = 0; i < this.branches.length; i++) {
        point(this.branches[i].x, this.branches[i].y);
      }
      pop();
    } else {
      noStroke();
      fill(255);
      push();
      beginShape();
      translate(this.x * this.resolution, this.y * this.resolution);
      for (let i = 0; i < this.branches.length; i++) {
        curveVertex(this.branches[i].x, this.branches[i].y);
      }
      endShape(CLOSE);
      pop();
    }
  }

  update() {
    for (let i = 0; i < this.branches.length; i++) {
      if (i % 2 === 0) {
        this.extend(this.branches[i], i);
      } else {
        this.contract(this.branches[i], i);
      }
    }
  }

  init() {
    for (let i = 0; i <= TWO_PI; i += TWO_PI / this.count) {
      this.branches.push(new Branch(i, this.r, this.resolution));
    }
  }

  extend(b, a) {
    b.x = cos(a * TWO_PI / this.count) * (this.r + sin(time) * this.travel);
    b.y = sin(a * TWO_PI / this.count) * (this.r + sin(time) * this.travel);
  }

  contract(b, a) {
    b.x = cos(a * TWO_PI / this.count) * (this.r - sin(time) * this.travel);
    b.y = sin(a * TWO_PI / this.count) * (this.r - sin(time) * this.travel);
  }
}