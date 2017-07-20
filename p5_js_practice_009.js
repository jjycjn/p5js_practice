var x, y; 
var t;
var a, b, d;
var Lissajous = [];
var aslider, bslider, dslider, button;

function setup() {
  createCanvas(640, 600);
  
  aslider = createSlider(1, 10, 5, 1);
  aslider.position(20, 20);
  bslider = createSlider(1, 10, 4, 1);
  bslider.position(20, 45);
  dslider = createSlider(0, 1, 0.5, 0.01);
  dslider.position(20, 70);
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
  
  a = aslider.value();
  b = bslider.value();
  d = dslider.value();
  x = 200 * sin(a * t + d * PI);
  y = 200 * sin(b * t);
  Lissajous.push(createVector(x,y));
  t += 0.1 / max(abs(a),abs(b));
  
  noStroke();
  fill(0);
  textSize(15);
  text("a = " + a, 28 + aslider.width, 17 + aslider.y);
  text("b = " + b, 28 + bslider.width, 17 + bslider.y);
  text("d = " + d + "PI", 28 + dslider.width, 17 + dslider.y);
  
  translate(width/2 + 20, height/2 + 40);  
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (var i = 0; i < Lissajous.length; i += 1) {
    vertex(Lissajous[i].x, Lissajous[i].y);
  }
  endShape();
}

function Refresh() {
  background(255);
  Lissajous = [];
  t = 0;
}