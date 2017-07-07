var R; // radius of the outer circle
var r; // radius of the inner circle
var d;
var t; // time variable
var xold, yold, xnew, ynew, result = []; // resulting curve

var rslider, dslider, button;


function setup() {
  createCanvas(640, 640);

  R = 100;
  r = 20;
  d = r;
  t = 0;
  rslider = createSlider(-R + 1, R, 20, 1);
  rslider.position(20, 20);
  dslider = createSlider(0, 150, r, 1);
  dslider.position(20, 45);
  button = createButton("Refresh")
    button.position(20, 600);
  button.mousePressed(Refresh);

  xold = (R + r) * cos(t) - d * cos((R+r) / r * t);
  yold = (R + r) * sin(t) - d * sin((R+r) / r * t);
  result.push(xold);
  result.push(yold);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  for (var i = -300; i < width/2; i += 50) {
    stroke(220)
    line(i, -height/2, i, height/2);
  }
  for (var i = -300; i < width/2; i += 50) {
    stroke(220)
    line(-width/2, i, width/2, i);
  }
  stroke(0);
  line(0, -height/2, 0, height/2);
  line(-width/2, 0, width/2, 0);
  stroke(0, 0, 255);
  noFill();
  ellipse(0, 0, 2*R, 2*R);
  
  t -= r / (R + r) * 0.1;
  r = rslider.value();
  d = dslider.value();
  xnew = (R + r) * cos(t) - d * cos((R+r) / r * t);
  ynew = (R + r) * sin(t) - d * sin((R+r) / r * t);
  result.push(xnew);
  result.push(ynew);

  stroke(0);
  fill(0);
  ellipse((R+r) * cos(t), (R+r) * sin(t), 5, 5);
  line((R+r) * cos(t), (R+r) * sin(t), xnew, ynew);
  noFill();
  ellipse((R+r) * cos(t), (R+r) * sin(t), 2 * r, 2 * r);
  stroke(255, 0, 0);
  fill(255, 0, 0);
  ellipse(xnew, ynew, 5, 5);
  noFill();
  beginShape();
  for (var i = 0; i < result.length; i += 2) {
    vertex(result[i], result[i+1]);
  }
  endShape();
  noStroke();
  fill(0);
  textSize(15);
  text("r = " + r / R, -160, -285);
  text("d = " + d / R, -160, -260);

  xold = xnew;
  yold = ynew;
}

function Refresh() {
  xold = (R + r) * cos(t) - d * cos((R+r) / r * t);
  yold = (R + r) * sin(t) - d * sin((R+r) / r * t);
  result = [];
  result.push(xold);
  result.push(yold);
}