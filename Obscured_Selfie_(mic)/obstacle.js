class Obstacle {
  constructor(x, y, s) {
    this.x = x; //x location
    this.y = y; //y location
    this.w = s; //width of object
    this.h = s; //height of object
    this.transparency = 255; //opacity of object
    this.color = color(255, this.transparency); //color of object
  }

  fadeOut(v) {
    noStroke();
    if (v > 0.1 && random(1) > 0.6) { //mouse touching object
      console.log("fade obstacle");
      this.transparency -= 1.5; //decrease transparency
      this.color = color(255, this.transparency); //redefine the color
      fill(this.color); //fill with new color
      rect(this.x, this.y, this.w, this.h); //draw rectangle
    } else { //mouse not touching object
      fill(this.color); //fill with opaque color
      rect(this.x, this.y, this.w, this.h); //draw rectangle
    }
  }
}