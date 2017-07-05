var bird;
var pipes;
var score;
var button;
var stop;
var img;

function setup() {
  Reset();
  button = createButton("Restart!")
    button.mousePressed(Reset);
  button.position(20, 350);
}

function draw() {
  background(220);


  if (!pipes[0].collison) {
    if (frameCount % 80 == 0) {
      pipes.push(new Pipe());
    }
  }

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    pipes[i].hits(bird);

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.show();
  bird.update();
  bird.check();

  textSize(15);
  fill(0);
  text(score, 600, 20);
}

function Bird() {
  this.x = 100;
  this.y = height/2;
  this.gravity = 0.2;
  this.velocity = 0;

  this.show = function() {
    fill(0);
    image(img, this.x, this.y, img.width/3, img.height/3);
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity * stop;
  }

  this.up = function() {
    this.velocity += -5;
  }

  this.check = function() {
    if (bird.y < 0 || bird.y > height) {
      textSize(50);
      fill(0);
      text("Game over!!!", 180, 170);
      textSize(15);
      text("your score is " + score, 260, 200);
      stop = 0;
      button.position(20, 350);
    }
  }
}

function Pipe() {
  this.top = random(height/2);
  this.bottom = this.top + random(160, 240);
  this.x = width;
  this.w = random(30, 60);
  this.speed = random(3, 4);
  this.collision = false;

  this.show = function() {
    if (this.collision) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height);
  }

  this.update = function() {
    this.x -= this.speed * stop;
  }

  this.offscreen = function() {
    return (this.x < -this.w);
  }

  this.hits = function(bird) {
    if (this.x < 100 + img.width/3 && this.x + this.w > 100) {
      if (bird.y < this.top || bird.y + img.height/3 > this.bottom) {
        textSize(50);
        fill(0);
        text("Game over!!!", 180, 170);
        textSize(15);
        text("your score is " + score, 260, 200);
        this.collision = true;
        stop = 0;
      } else {
        score += 10;
      }
    }
  }
}

function Reset() {
  createCanvas(640, 320);
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  img = loadImage("Miji.png")
  stop = 1;
  score = 0;
}

function keyPressed() {
  if (key == " ") {
    bird.up();
  }
}