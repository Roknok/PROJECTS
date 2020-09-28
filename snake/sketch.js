let cols;
let rows;
let grid = 10;
let s;
let f;

function setup() {
  createCanvas(400, 400);
  cols = width / grid;
  rows = height / grid;
  s = new Snake();
  frameRate(2);
  food();
}
function draw() {
  background(200);
  s.update();
  s.show();
  fill(255, 0, 0);
  rect(f.x * cols, f.y * rows, cols, rows);
}
function keyPressed() {
  if (keyCode === RIGHT_ARROW && s.dir.x !== -1 && s.dir.y !== 0) {
    r();
  } else if (keyCode === LEFT_ARROW && s.dir.x !== 1 && s.dir.y !== 0) {
    l();
  } else if (keyCode === DOWN_ARROW && s.dir.x !== 0 && s.dir.y !== -1) {
    d();
  } else if (keyCode === UP_ARROW && s.dir.x !== 0 && s.dir.y !== 1) {
    u();
  }
}
function r() {
  s.dir.x = 1;
  s.dir.y = 0;
}
function l() {
  s.dir.x = -1;
  s.dir.y = 0;
}
function d() {
  s.dir.x = 0;
  s.dir.y = 1;
}
function u() {
  s.dir.x = 0;
  s.dir.y = -1;
}
function food() {
  f = vector(floor(random(9)), floor(random(9)));
  for (var i = 0; i < s.body.length; i++) {
    if (compare(f, s.body[i])) {
      food();
      break;
    }
  }
}
function vector(a,b){
    return {x:a,y:b}
}
