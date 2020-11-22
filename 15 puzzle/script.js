let rows = 4;
let cols = 4;

let grid = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

let solvedgrid = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  scramble();
}
function draw() {
  background(200);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (grid[j][i] !== 16) {
        if (i + j * rows + 1 === grid[j][i]) {
          fill("#ff781f");
        } else {
          fill(0, 0, 255);
        }
        rect(
          i * (width / rows),
          j * (height / rows),
          width / rows,
          height / cols
        );
        textSize(60);
        fill(0);
        text(
          grid[j][i],
          i * (width / rows) + width / rows / 2,
          j * (height / rows) + height / rows / 2
        );
      }
    }
  }
  textSize(100);
  if (grid === solvedgrid) {
    background(200, 150);
    text("DONE !!", height / 2, width / 2);
    noLoop();
  }
}
function down() {
  transpose();
  right();
  transpose();
}
function up() {
  transpose();
  left();
  transpose();
}
function right() {
  grid.forEach((ele) => {
    if (ele.includes(16)) {
      if (ele[ele.indexOf(16) - 1]) {
        swap(ele, ele.indexOf(16) - 1, ele.indexOf(16));
      }
    }
  });
}
function left() {
  grid.forEach((ele) => {
    if (ele.includes(16)) {
      if (ele[ele.indexOf(16) + 1]) {
        swap(ele, ele.indexOf(16) + 1, ele.indexOf(16));
      }
    }
  });
}

function swap(ele, a, b) {
  let storage = ele[a];
  ele[a] = ele[b];
  ele[b] = storage;
}

function transpose() {
  let arr = new Array();
  for (var i = 0; i < rows; i++) {
    arr.push(new Array());
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      arr[i][j] = grid[j][i];
    }
  }
  grid = arr;
}

function scramble() {
  for (var i = 0; i < 1000; i++) {
    r = floor(random(4));
    if (r === 0) {
      up();
    } else if (r === 1) {
      down();
    } else if (r === 2) {
      right();
    } else if (r === 3) {
      left();
    }
  }
}

var hammertime = new Hammer(document.body);
hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
hammertime.on("swipe", function (ev) {
  let dir = ev.direction;
  if (dir === 16) {
    down();
  }
  if (dir === 4) {
    right();
  }
  if (dir === 2) {
    left();
  }
  if (dir === 8) {
    up();
  }
});
