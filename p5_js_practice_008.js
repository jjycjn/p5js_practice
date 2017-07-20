var x, y; 
var t;
var n, d, k;
var Rose = [];
var nslider, dslider, button;

function setup() {
  createCanvas(640, 600);
  
  nslider = createSlider(1, 10, 3, 1);
  nslider.position(20, 20);
  dslider = createSlider(1, 10, 5, 1);
  dslider.position(20, 45);
  button = createButton("Refresh")
    button.position(20, 560);
  button.mousePressed(Refresh);
  t = 0;
}

function draw() {
  background(255);
  
  stroke(220);
  for (var i = 20; i < width; i += 40) {
    line(0, i, width, i);
    line(i, 0, i, height);
  }
  
  n = nslider.value();
  d = dslider.value();
  k = n/d;
  x = 240 * sin(k * t) * cos(t);
  y = 240 * sin(k * t) * sin(t);
  Rose.push(createVector(x,y));
  t += 0.1 / max(abs(k), 1);
  
  noStroke();
  fill(0);
  textSize(15);
  text("n = " + n, 28 + nslider.width, 17 + nslider.y);
  text("d = " + d, 28 + dslider.width, 17 + dslider.y);
  text("k = n/d = " + k, 30 + dslider.width, 41 + dslider.y);
  
  translate(width/2 + 20, height/2 + 40);  
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (var i = 0; i < Rose.length; i += 1) {
    vertex(Rose[i].x, Rose[i].y);
  }
  endShape();
}

function Refresh() {
  background(255);
  Rose = [];
  t = 0;
}