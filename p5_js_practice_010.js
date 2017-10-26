function setup() {
  createCanvas(600, 620);
  modslider = createSlider(2, 120, 9, 1);
  modslider.position(430, 590);
}

function draw() {
  translate(20, 20);
  background(255);
  mod = modslider.value();
  size = 560 / (mod-1);
  from = color(255, 153, 0);
  to = color(0, 102, 255);
  noStroke();
  for (var i = 1; i < mod; i++) {
    for (var j = 1; j < mod; j++) {
      now = (i*j) % mod;
      fill(lerpColor(from, to, now/(mod-1)));
      rect((i-1)*size, (j-1)*size, size, size);
      if (mod < 40) {
        fill(0);
        textSize(size/2);
        textAlign(CENTER, CENTER);
        text(now, (i-1)*size + size/2, (j-1)*size + size/2);
      }
    }
  }
  stroke(0);
  for (var i = 0; i < mod; i++) {
    line(0, i*size, 560, i*size);
    line(i*size, 0, i*size, 560);
  }
}