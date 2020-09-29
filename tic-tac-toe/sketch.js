let size = 550;
let turn = 0;
let x;
let xo;
let cvn;
let tic = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function setup() {
  cvn = createCanvas(size, size);
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(5);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      rect((i * size) / 3, (j * size) / 3, size / 3, size / 3);
    }
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      x = hovers(i * size/3, i * size/3 + size/3, j * size/3, j * size/3 + size/3);
      if (x) {
        if (turn === 0 && tic[i][j] === null) {
          xdraw(i * size/3, j * size/3);
        } else if (turn === 1 && tic[i][j] === null) {
          odraw(i * size/3, j * size/3);
        }
      }
    }
  }

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tic[i][j] === 0) {
        xdraw(i * size/3, j * size/3, true);
      } else if (tic[i][j] === 1) {
        odraw(i * size/3, j * size/3, true);
      }
    }
  }

  if (!win()) {
    background(0, 200);
    noStroke();
    fill(255, 0, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text(xo + " " + "wins", size/2, size/2);
    noLoop();
    stop()
    exit
  }

  if (!drawcheck()) {
    background(0, 200);
    noStroke();
    fill(255, 0, 0);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("draw", size/2, size/2);
    noLoop();
  }

  cvn.mousePressed(() => {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        x = hovers(i * size/3, i * size/3 + size/3, j * size/3, j * size/3 + size/3);
        if (x) {
          if (turn === 1 && tic[i][j] === null) {
            tic[i][j] = 1;
          } else if (turn === 0 && tic[i][j] === null) {
            tic[i][j] = 0;
          }
        }
      }
    }

    if (turn === 0) {
      turn = 1;
    } else if (turn === 1) {
      turn = 0;
    }
  });
}
function hovers(a, b, c, d) {
  this.hover = false;
  if (mouseX > a && mouseX < b && mouseY > c && mouseY < d) {
    this.hover = true;
  } else {
    this.hover = false;
  }
  return this.hover;
}
function xdraw(a, b, c) {
  strokeWeight(10);
  if (c) {
    stroke(0);
  } else {
    stroke(150, 150, 150);
  }
  line(a + 20, b + 20, a + size/3 - 20, b + size/3 - 20);
  line(a + size/3 - 20, b + 20, a + 20, b + size/3 - 20);
}
function odraw(a, b, c) {
  strokeWeight(10);
  if (c) {
    stroke(0);
  } else {
    stroke(150, 150, 150);
  }
  circle(a + (size/3)/2, b + (size/3)/2, size/3-20);
}
function drawcheck() {
  this.t = false;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (tic[i][j] === null) {
        this.t = true;
        break;
      }
    }
  }
  return this.t;
}
function win() {
  this.t = true;

  for (var i = 0; i < 3; i++) {
    if (tic[i][0] === tic[i][1]) {
      if (tic[i][1] === tic[i][2] && tic[i][2] !== null) {
        if (tic[i][2] === 1) {
          xo = "O";
        } else {
          xo = "X";
        }
        this.t = false;
        break;
      }
    }
    if (tic[0][i] === tic[1][i]) {
      if (tic[1][i] === tic[2][i] && tic[2][i] !== null) {
        if (tic[2][i] === 1) {
          xo = "O";
        } else {
          xo = "X";
        }
        this.t = false;
        break;
      }
    }
    if (tic[0][0] === tic[1][1]) {
      if (tic[2][2] === tic[1][1] && tic[0][0] !== null) {
        if (tic[0][0] === 1) {
          xo = "O";
        } else {
          xo = "X";
        }
        this.t = false;
        break;
      }
    }

    if (tic[0][2] === tic[1][1]) {
      if (tic[2][0] === tic[1][1] && tic[0][2] !== null) {
        if (tic[0][2] === 1) {
          xo = "O";
        } else {
          xo = "X";
        }
        this.t = false;
        break;
      }
    }



  }

  return this.t;
}
