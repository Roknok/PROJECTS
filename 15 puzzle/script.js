let rows = 4;
let cols = 4;
let moves = 0;
let time = 0;
let started = false;
let interval;

let tiles = document.querySelectorAll(".tile");

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
  noCanvas();
  scramble();
  align();
}
function align() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      tiles[grid[i][j] - 1].style["top"] = i * 100 + i * 10 + 12 + "px";
      tiles[grid[i][j] - 1].style["left"] = j * 100 + j * 10 + 12 + "px";
      if (i * 4 + j === grid[i][j] - 1) {
        tiles[grid[i][j] - 1].classList.add("outofplace");
      } else {
        tiles[grid[i][j] - 1].classList.remove("outofplace");
      }
    }
    if (solved()) {
      document.getElementById("cover").style["display"] = "flex";
        clearInterval(interval);
    } else {
      document.getElementById("cover").style["display"] = "none";
    }
  }
}

function solved() {
  let bool = true
  for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++) {
      if (grid[i][j] !== solvedgrid[i][j]) {
        bool = false
      }
    }
  }
  return bool
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
  align();
  moves++;
  document.getElementById("moves").innerHTML = moves;
  if (moves === 1) {
    interval = setInterval(() => {
      time++;
      document.getElementById("time").innerHTML = time;
    }, 1000);
  }
});
