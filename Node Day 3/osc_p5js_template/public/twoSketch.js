window.onload = function() {
  var x, y, z, tx, ty, t1, t2, t3, f4, b1, b3, b3, b4, b, bg, head;
  let socket = io.connect(window.location.origin);
  socket.on('mysocket', function(data) {
    console.log(data[0] + " " + data[1]);
    if (data[0] === "/1/fader1" && data[1] !== null) {
      x = map(data[1], 0, 1, -400, 400);
    }
    if (data[0] === "/1/fader2" && data[1] !== null) {
      y = map(data[1], 0, 1, -400, 400);
    }
    if (data[0] === "/1/fader3" && data[1] !== null) {
      z = map(data[1], 0, 1, -400, 400);
    }
    if (data[0] === "/1/fader4" && data[1] !== null) {
      f4 = map(data[1], 0, 1, 0, 400);
    }
    if (data[0] === "/1/xy" && data[1] !== null) {
      tx = map(data[1], 0, 1, -400, 400);
      ty = map(data[2], 0, 1, -400, 400);
    }
    if (data[0] === "/1/toggle1" && data[1] !== null) {
      t1 = data[1];
    }
    if (data[0] === "/1/toggle2" && data[1] !== null) {
      t2 = data[1];
    }
    if (data[0] === "/1/toggle3" && data[1] !== null) {
      t3 = data[1];
    }
    if (data[0] === "/1/push1" && data[1] !== null) {
      b1 = data[1];
    }
    if (data[0] === "/1/push2" && data[1] !== null) {
      b2 = data[1];
    }
    if (data[0] === "/1/push3" && data[1] !== null) {
      b3 = data[1];
    }
    if (data[0] === "/1/push4" && data[1] !== null) {
      b4 = data[1];
    }

  });

  let elem = document.getElementById('draw-shapes');
  let params = {
    width: 400,
    height: 400
  };
  let two = new Two(params).appendTo(elem);
  // two has convenience methods to create shapes.
  let curve = two.makeCurve(0, 200, 50, 150, 100, 200, 100, 250, true);
  curve.stroke('red');
  curve.linewidth(5);
  two.update();
}