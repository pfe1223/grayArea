class FlowField {
  constructor(r) {
    this.resolution = r;
    this.cols = floor(width / this.resolution);
    this.rows = floor(height / this.resolution);
    this.gap = 3;
    this.grid = new Array(this.cols * this.rows);
  }

  lookup(lookup) {
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    //println(lookup.x);
    return this.grid[column + row * this.cols];
  }

  debug() {
    stroke(255);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        push();
        translate(x * this.resolution, y * this.resolution);
        rotate(this.grid[index].heading());
        strokeWeight(1);
        line(0, 0, this.resolution, 0);
        pop();
      }
    }
  }

  init() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let v = createVector(1, -1);
        //v.setMag(1);
        this.grid[index] = v;
      }
    }
  }

  update(b) {
    for (let i = 0; i < b.branches.length; i++) {
      let pixelX = b.x * this.resolution + b.branches[i].x;
      let pixelY = b.y * this.resolution + b.branches[i].y;
      let gridX = floor(pixelX / this.resolution);
      let gridY = floor(pixelY / this.resolution);
      let index = gridX + gridY * this.cols;
      this.grid[index].add(b.branches[i].v);
    }
  }
}