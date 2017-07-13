var circles = [];
var pen;
var path = [];
var resolution = 20;
var k = -4; // determine the speed of each circles
var n = 5; // number of circles

var kSlider;
var nSlider;
var button;

function setup() {
  createCanvas(640, 640);

  kSlider = createSlider(-8, 8, -4, 1);
  kSlider.position(20, 20);
  nSlider = createSlider(2, 8, 5, 1);
  nSlider.position(20, 45);
  button = createButton("Refresh");
  button.position(20, 600);
  button.mousePressed(Refresh);

  circles[0] = new Circle(0, 0, 150, 0, null);
  for (var i = 1; i < n; i++) {
    circles[i - 1].addCircle();
  }
  pen = circles[circles.length - 1]
}

function draw() {
  background(255);

  // show values of k and n
  noStroke();
  fill(0);
  textSize(15);
  k = kSlider.value();
  n = nSlider.value();
  text("k = " + k, kSlider.x + kSlider.width + 10, 35);
  text("n = " + n, nSlider.x + nSlider.width + 10, 60);

  translate(width / 2, height / 2);

  // draw the pen
  noStroke();
  fill(255, 0, 0);
  ellipse(pen.x, pen.y, 5);

  // update all circles' position
  for (var i = 0; i < resolution; i++) {
    path.push(createVector(pen.x, pen.y));
    for (var j = 1; j < circles.length; j++) {
      circles[j].update();
    }
  }

  // draw updated circles
  noFill();
  stroke(0);
  circles[0].show();
  for (var j = 1; j < circles.length; j++) {
    stroke(0, 0, 255);
    circles[j].show();
  }

  // draw the fractral curve given
  beginShape();
  stroke(255, 0, 0);
  noFill();
  for (var pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();

  // if the curve is closed, then refresh
  if (abs(circles[1].x - circles[0].r - circles[1].r) < 0.001) {
    path = [];
  }
}

function Circle(x, y, r, n, p) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.a = 0;
  this.n = n;
  this.t = radians(pow(k, n)) / (resolution * abs(k));
  this.parent = p;

  this.show = function() {
    ellipse(this.x, this.y, 2 * this.r);
  }

  this.update = function() {
    var parent = this.parent
      if (parent != null) {
      this.x = parent.x + (parent.r + this.r) * cos(this.a);
      this.y = parent.y + (parent.r + this.r) * sin(this.a);
      this.a += this.t;
    }
  }

  this.addCircle = function() {
    var newr = this.r / 3;
    var newx = this.x + this.r + newr;
    var newy = this.y;
    var newa = 0;
    var newt = -2 * this.t
      circles.push(new Circle(newx, newy, newr, n + 1, this));
  }
}

function Refresh() {
  circles = [];
  k = kSlider.value();
  n = nSlider.value();
  circles[0] = new Circle(0, 0, 150, 0, null);
  for (var i = 1; i < n; i++) {
    circles[i - 1].addCircle();
  }
  pen = circles[circles.length - 1]
    path = [];
  redraw();
}