let blobs, time, flowfield, boids;

function setup() {
  createCanvas(400, 400);
  time = 0;
  flowfield = new FlowField(20, 20);
  flowfield.init();
  blobs = [];
  for (let i = 0; i < 1; i++) {
    blobs.push(new Blob(flowfield.resolution));
    blobs[i].init();
  }
  boids = [];
}

function draw() {
  background(50);
  flowfield.debug(); //show vectors of the flowfield
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].display();
    blobs[i].update();
    flowfield.update(blobs[i]);
  }

  for (let i = 0; i < boids.length; i++) {
    boids[i].follow(flowfield);
    boids[i].run();
  }
  time += 0.01;

}

function keyPressed() {

}

function mousePressed() {
  boids.push(new Boid(mouseX, mouseY, 4, 0.1));
}