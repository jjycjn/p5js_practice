var angle, size, slider1, slider2;
var rootcolor, leafcolor, currentcolor, weight;

function setup() {
  createCanvas(640, 550);
  slider1 = createSlider(0, PI, PI/6, 0.01);
  slider1.position(20, 20);
  slider2 = createSlider(0, 0.75, 0.75, 0.01);
  slider2.position(20, 40);
  rootcolor = color(100, 50, 0);
  leafcolor = color(60, 120, 0);
  textSize(15);
  
}

function draw() {
  background(255);
  angle = slider1.value();
  size = slider2.value();
  push();
  translate(width/2, height);
  branch(120);
  pop();
  noStroke();
  fill(0);
  ellipse(width/2, height + 30, 300, 100);
  text("angle", 160, 35);
  text("length", 160, 55);
}

function branch(len) {
  weight = map(len, 0, 50, 1, 0);
  currentcolor = lerpColor(rootcolor, leafcolor, weight);
  stroke(currentcolor);
  strokeWeight(len/10);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 5) {
    push();
    rotate(angle);
    branch(len * size);
    pop();
    push();
    rotate(-angle);
    branch(len * size);
    pop();
  }
}
