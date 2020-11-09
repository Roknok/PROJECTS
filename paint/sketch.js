let button;
let size = 15;
let red;
let r = 0,
  b = 0,
  g = 0;

function setup() {
  p5.disableFriendlyErrors = true;
  createCanvas(windowWidth,windowHeight);
  button = createButton("x");
  sty(button);
  button.position(windowWidth / 2 + width / 2 - button.width, 0);
  setu();
}

function sty(button) {
  button.style("width", "70px");
  button.style("height", "30px");
  button.style("border", "2px solid black");
  button.style("outline", "none");
  button.style("font-size", "20px");
}

function setu() {
  stroke(0);
  strokeWeight(5);
  fill(235);
  rect(0, 0, width, height);
}

function draw() {
for(var i = 0;i<5;i++){
  button.position(windowWidth / 2 + width / 2 - button.width, 0);
  noStroke();
  fill(255, 0, 0);
  rect(2, 2, 30, 30);
  fill(0, 255, 0);
  rect(32, 2, 30, 30);
  fill(0, 0, 255);
  rect(62, 2, 30, 30);
  fill(0, 255, 255);
  rect(92, 2, 30, 30);
  fill(255, 255, 0);
  rect(122, 2, 30, 30);
  fill(255, 20, 147);
  rect(152, 2, 30, 30);
  fill(255, 255, 255);
  rect(182, 2, 30, 30);
  fill(0, 0, 0);
  rect(212, 2, 30, 30);
  fill(235);
  strokeWeight(1);
  stroke(0);
  rect(241, 1, 30, 30);

  rect(350, 2, 30, 30);
  strokeWeight(5);
  point(365, 15 + 2);
  strokeWeight(1);
  rect(350 + 30, 2, 30, 30);
  strokeWeight(10);
  point(365 + 30, 15 + 2);
  strokeWeight(1);
  rect(350 + 60, 2, 30, 30);
  strokeWeight(15);
  point(365 + 60, 15 + 2);
  strokeWeight(1);
  rect(350 + 60 + 30, 2, 30, 30);
  strokeWeight(20);
  point(365 + 90, 15 + 2);

  fill(0, 0);
  strokeWeight(5);
  rect(0, 0, width, height);

    button.mousePressed(() => {
         fill(235);
         rect(0, 0, width, height);
    })


  if (mouseIsPressed) {
    strokeWeight(size);
    stroke(r, g, b);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}
}

function mousePressed() {
  if (mouseY > 2 && mouseY < 32) {
    if (mouseX > 2 && mouseX < 32) {
      r = 255;
      g = 0;
      b = 0;
    }
    if (mouseX > 32 && mouseX < 62) {
      r = 0;
      g = 255;
      b = 0;
    }
    if (mouseX > 62 && mouseX < 92) {
      r = 0;
      g = 0;
      b = 255;
    }
    if (mouseX > 92 && mouseX < 122) {
      r = 0;
      g = 255;
      b = 255;
    }
    if (mouseX > 122 && mouseX < 152) {
      r = 255;
      g = 255;
      b = 0;
    }
    if (mouseX > 152 && mouseX < 182) {
      r = 250;
      g = 20;
      b = 147;
    }
    if (mouseX > 182 && mouseX < 212) {
      r = 255;
      g = 255;
      b = 255;
    }
    if (mouseX > 212 && mouseX < 242) {
      r = 0;
      g = 0;
      b = 0;
    }
    if (mouseX > 242 && mouseX < 272) {
      r = 235;
      g = 235;
      b = 235;
    }
    if (mouseX > 350 && mouseX < 350 + 30) {
      size = 5;
    }
    if (mouseX > 350 + 30 && mouseX < 350 + 60) {
      size = 10;
    }
    if (mouseX > 350 + 60 && mouseX < 350 + 90) {
      size = 15;
    }
    if (mouseX > 350 + 90 && mouseX < 350 + 90 + 30) {
      size = 20;
    }
  }
}



