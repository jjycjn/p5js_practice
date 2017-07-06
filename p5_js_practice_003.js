var Start = "F-G-G";
var Rules = [];
var Result = Start;
var lineLength = 1000;
var n = 0;

Rules[0] = {
  input: "F", 
  output: "F-G+F+G-F"
}
Rules[1] = {
  input: "G", 
  output: "GG"
}

function Generate() {
  var nextResult = "";
  for (var i = 0; i < Result.length; i++) {
    var check = Result.charAt(i);
    for (var j = 0; j < Rules.length; j++) {
      var found = false;
      if (check == Rules[j].input) {
        nextResult += Rules[j].output;
        var found = true;
        break;
      } 
    }
    if (!found) {
        nextResult += check;
    }
  }
  return nextResult;
}

function Turtle() {
  for (var i = 0; i < Result.length; i++) {
    var check = Result.charAt(i);
    if (check == "F") {
      line(0, 0, 0, -lineLength);
      translate(0, -lineLength);
    } else if (check == "G") {
      line(0, 0, 0, -lineLength);
      translate(0, -lineLength);
    } else if (check == "+") {
      rotate(+TWO_PI/3);
    } else if (check == "-") {
      rotate(-TWO_PI/3);
    }
  }
}

function setup() {
  createCanvas(640, 600);
  background(255);
  textSize(15);
  text("n = " + n, 110, 565);
  var button = createButton("Generate")
  button.mousePressed(Button);
  button.position(30, 550);
}

function draw() {
}

function Button() {
  background(255);
  n += 1;
  if (n > 8) {
    background(255);
    Result = "F-G-G";
    lineLength = 1000;
    n = 0;
    text("n = " + n, 110, 565);
  } else {
    lineLength /= 2;
    text("n = " + n, 110, 565);
    push();
    translate(500, 550);
    Turtle();
    pop();
    Result = Generate();
  }  
}