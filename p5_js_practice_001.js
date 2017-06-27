var radius = 20;

function setup() {
  createCanvas(640, 640);
}

function draw() {
  background(0);
  noStroke();

  for (var i = 0; i <= width; i += radius) {
    for (var j = 0; j <= height; j += radius) {
      ellipseMode(CENTER);

      // r is the radius of each circles
      var r = dist(mouseX, mouseY, i, j) * radius / 200;

      var maxradius = radius * 1.2;
      if (r > maxradius) { 
        r = maxradius;
      }
      ellipse(i, j, r, r);
    }
  }
}

function mouseClicked() {
  radius *= 2;
  if (radius > 320)
  { 
    radius = 20;
  }
}