var R; // the radius of the outer circle
var k; // how big the inner circle is with respect to the outer circle
var l; // how far the point is located from the center of the inner circle
var t; // time variable
var xold, yold, xnew, ynew; // defined for a line segment
var hue, i; // defined for a color of a line segment
var button, kslider, lslider;

function setup() {
  createCanvas(640, 640);

  button = createButton("Refresh");
  button.position(20, 600);
  button.mousePressed(Refresh);
  kslider = createSlider(0, 1, 0.24, 0.01);
  kslider.position(20, 20);
  lslider = createSlider(0, 1, 0.95, 0.01);
  lslider.position(20, 40);

  // initial setup
  R = 280;
  t = 0;
  k = kslider.value();
  l = lslider.value();
  hue = 0;
  i = 0.5;
  xold = R * ((1-k) * cos(t) + l * k * cos((1-k) * t / k));
  yold = R * ((1-k) * sin(t) + l * k * sin((1-k) * t / k));

  translate(360, 320);
  stroke(220);
  ellipse(0, 0, 2*R, 2*R);
}

function draw() {
  k = kslider.value();
  l = lslider.value();
  t += k / 5;
  xnew = R * ((1-k) * cos(t) + l * k * cos((1-k) * t / k));
  ynew = R * ((1-k) * sin(t) + l * k * sin((1-k) * t / k));

  // draw a line segment
  translate(360, 320);
  colorMode(HSB);
  stroke(hue, 100, 100);
  line(xold, yold, xnew, ynew);

  // update
  xold = xnew;
  yold = ynew;
  hue += 0.1;
  if (hue > 360) {
    hue = 0;
  }
}

function Refresh() {
  k = kslider.value();
  l = lslider.value();
  t = 0;
  xold = R * ((1-k) * cos(t) + l * k * cos((1-k) * t / k));
  yold = R * ((1-k) * sin(t) + l * k * sin((1-k) * t / k));

  stroke(220);
  ellipse(0, 0, 2*R, 2*R);
}