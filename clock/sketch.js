let sc;
let hr;
let mn;
let secAngle;
let minAlgle;
let hrAngle;
let canvas;
let rect1;
let rect2;
let rect3;

function setup() {
  canvas = createCanvas(400, 520);
  angleMode(DEGREES);
  textAlign(CENTER);
}
function draw() {
  textSize(13);
  sc = second();
  hr = hour();
  if (hr > 12) {
    hr = hr - 12;
  }
  mn = minute();
  secAngle = map(sc, 0, 60, 0, 360);
  minAngle = map(mn, 0, 60, 0, 360);
  hrAngle = map(hr, 0, 12, 0, 360);
  rect1 = map(sc, 0, 60, 0, 75);
  rect2 = map(mn, 0, 60, 0, 75);
  rect3 = map(hr, 0, 12, 0, 75);

  background(0);
  translate(200, 215);

  push();
  for (var i = 0; i < 60; i++) {
    strokeWeight(2);
    stroke(255);
    line(0, -165, 0, -175);
    rotate(6);
  }
  pop();
  push();
  for (var i = 0; i < 60 / 5; i++) {
    strokeWeight(2.5);
    stroke(255);
    line(0, -155, 0, -175);
    rotate(6 * 5);
  }
  pop();

  stroke(255);
  strokeWeight(3);
  noFill();
  circle(0, 0, 350);
  push();
  fill(255);
  textSize(20);
  strokeWeight(1);
  text("Raunak's clock", 0, -190);
  noStroke();
  fill(255, 0, 0);
  rect(-85, 305, 30, -rect3);
  fill(0, 0, 255);
  rect(-20, 305, 30, -rect2);
  fill(0, 255, 0);
  rect(40, 305, 30, -rect1);
  stroke(255, 0, 255);
  line(-85, 305 - 75, 80, 305 - 75);
  pop();
  //hour hand
  push();
  stroke(255, 0, 0);
  rotate(hrAngle);
  strokeWeight(7);
  line(0, 0, 0, -100);
  translate(0, -120);
  strokeWeight(0.5);
  rotate(-hrAngle);
  text(hr, 0, 0);
  pop();
  //minute hand
  push();
  stroke(0, 0, 255);
  rotate(minAngle);
  strokeWeight(4);
  line(0, 0, 0, -150);
  translate(0, -160);
  strokeWeight(0.5);
  rotate(-minAngle);
  text(mn, 0, 0);
  pop();

  //second hand
  push();
  stroke(0, 255, 0);
  rotate(secAngle);
  strokeWeight(2);
  line(0, 0, 0, -150);
  translate(0, -160);
  strokeWeight(0.5);
  rotate(-secAngle);
  text(sc, 0, 0);
  pop();
  strokeWeight(15);
  stroke(255);
  point(0, 0);
  strokeWeight(5);
  stroke(0);
  point(0, 0);
  noStroke(), textSize(35);
  fill(255, 0, 0);
  text(hr + " : ", -55, 220);
  fill(0, 0, 255);
  text(nf(mn, 2) + " :   ", 15, 220);
  fill(0, 255, 0);
  text(nf(sc, 2), 55, 220);
}
