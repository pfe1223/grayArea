class Branch {
  constructor(a, r, resolution) {
    //a is the angle
    //r is the radius
    //resolution is the size of each square on the grid
    this.x = cos(a) * r;
    this.y = sin(a) * r;
    this.v = createVector(this.x, this.y);
    this.v.normalize();
    this.gridX = floor(this.x / resolution);
    this.gridY = floor(this.y / resolution);
    // console.log(`Xpos: ${this.gridX}, Ypos: ${this.gridY}`);
  }
}