//create stage for SVG
let r = new Rune({
  container: "#example1",
  width: 500,
  height: 400
});

console.log(r);

//loop to make 250 circles
for (let i = 0; i < 250; i++) {
  //create Rune object with random location and color
  r.circle(0, 0, 50)
    .stroke(false)
    .move(Rune.random(r.width), Rune.random(r.height))
    .fill(Rune.random(255), Rune.random(255), Rune.random(255), 0.5);
}

r.draw(); //draw the SVG (one time, not a loop)