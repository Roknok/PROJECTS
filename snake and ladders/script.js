let grid = 10;
let path = {
  0: { x: 0, y: 10 },
  1: { x: 0, y: 9 },
  2: { x: 1, y: 9 },
  3: { x: 2, y: 9 },
  4: { x: 3, y: 9 },
  5: { x: 4, y: 9 },
  6: { x: 5, y: 9 },
  7: { x: 6, y: 9 },
  8: { x: 7, y: 9 },
  9: { x: 8, y: 9 },
  10: { x: 9, y: 9 },
  11: { x: 9, y: 8 },
  12: { x: 8, y: 8 },
  13: { x: 7, y: 8 },
  14: { x: 6, y: 8 },
  15: { x: 5, y: 8 },
  16: { x: 4, y: 8 },
  17: { x: 3, y: 8 },
  18: { x: 2, y: 8 },
  19: { x: 1, y: 8 },
  20: { x: 0, y: 8 },
  21: { x: 0, y: 7 },
  22: { x: 1, y: 7 },
  23: { x: 2, y: 7 },
  24: { x: 3, y: 7 },
  25: { x: 4, y: 7 },
  26: { x: 5, y: 7 },
  27: { x: 6, y: 7 },
  28: { x: 7, y: 7 },
  29: { x: 8, y: 7 },
  30: { x: 9, y: 7 },
  31: { x: 9, y: 6 },
  32: { x: 8, y: 6 },
  33: { x: 7, y: 6 },
  34: { x: 6, y: 6 },
  35: { x: 5, y: 6 },
  36: { x: 4, y: 6 },
  37: { x: 3, y: 6 },
  38: { x: 2, y: 6 },
  39: { x: 1, y: 6 },
  40: { x: 0, y: 6 },
  41: { x: 0, y: 5 },
  42: { x: 1, y: 5 },
  43: { x: 2, y: 5 },
  44: { x: 3, y: 5 },
  45: { x: 4, y: 5 },
  46: { x: 5, y: 5 },
  47: { x: 6, y: 5 },
  48: { x: 7, y: 5 },
  49: { x: 8, y: 5 },
  50: { x: 9, y: 5 },
  51: { x: 9, y: 4 },
  52: { x: 8, y: 4 },
  53: { x: 7, y: 4 },
  54: { x: 6, y: 4 },
  55: { x: 5, y: 4 },
  56: { x: 4, y: 4 },
  57: { x: 3, y: 4 },
  58: { x: 2, y: 4 },
  59: { x: 1, y: 4 },
  60: { x: 0, y: 4 },
  61: { x: 0, y: 3 },
  62: { x: 1, y: 3 },
  63: { x: 2, y: 3 },
  64: { x: 3, y: 3 },
  65: { x: 4, y: 3 },
  66: { x: 5, y: 3 },
  67: { x: 6, y: 3 },
  68: { x: 7, y: 3 },
  69: { x: 8, y: 3 },
  70: { x: 9, y: 3 },
  71: { x: 9, y: 2 },
  72: { x: 8, y: 2 },
  73: { x: 7, y: 2 },
  74: { x: 6, y: 2 },
  75: { x: 5, y: 2 },
  76: { x: 4, y: 2 },
  77: { x: 3, y: 2 },
  78: { x: 2, y: 2 },
  79: { x: 1, y: 2 },
  80: { x: 0, y: 2 },
  81: { x: 0, y: 1 },
  82: { x: 1, y: 1 },
  83: { x: 2, y: 1 },
  84: { x: 3, y: 1 },
  85: { x: 4, y: 1 },
  86: { x: 5, y: 1 },
  87: { x: 6, y: 1 },
  88: { x: 7, y: 1 },
  89: { x: 8, y: 1 },
  90: { x: 9, y: 1 },
  91: { x: 9, y: 0 },
  92: { x: 8, y: 0 },
  93: { x: 7, y: 0 },
  94: { x: 6, y: 0 },
  95: { x: 5, y: 0 },
  96: { x: 4, y: 0 },
  97: { x: 3, y: 0 },
  98: { x: 2, y: 0 },
  99: { x: 1, y: 0 },
  100: { x: 0, y: 0 },
};

let portals = {
  39: 3,
  99: 7,
  88: 48,
  4: 23,
  8: 31,
  28: 77,
  42: 63,
  51: 90,
  74: 98,
};

let p;
let c;

let xb = 0;
let yb = 0;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  xb = width / grid / 2;
  yb = height / grid / 2;
  p = { pos: 0, off: 0 };
  c = { pos: 0, off: 0 };
}
let width = 500;
let height = 500;
function draw() {
  background(200);
  textSize(30);
  noStroke();
  width = 500;
  height = 500;
  push();
  translate(50, 50);
  for (var i = 0; i < grid; i++) {
    for (var j = 0; j < grid; j++) {
      fill((i + j) % 2 !== 0 ? 220 : 0, 255, 255);
      rect(
        (i * width) / grid,
        (j * height) / grid,
        width / grid,
        height / grid
      );
      fill(0);
      let iv = 0;
      if (j % 2 !== 0) {
        iv = i + 1;
      } else {
        iv = 10 - i;
      }

      let jv = 10 - j - 1;

      text(
        jv * grid + iv,
        (i * width) / grid + width / grid / 2,
        (j * height) / grid + height / grid / 2
      );
    }
  }

  if (p.pos === c.pos) {
    p.off = 5;
    c.off = -5;
  } else {
    p.off = 0;
    c.off = 0;
  }

  document.getElementById("p").style["top"] =
    (path[p.pos].y * height) / grid + yb + 50 - 20 + "px";
  document.getElementById("p").style["left"] =
    path[p.pos].x * (width / grid) + xb + p.off + 30 + "px";

  document.getElementById("c").style["top"] =
    (path[c.pos].y * height) / grid + yb + 50 - 20 + "px";
  document.getElementById("c").style["left"] =
    path[c.pos].x * (width / grid) + xb + c.off + 30 + "px";

  stroke("yellow");
  ladder(4, 23);
  stroke("blue");
  ladder(28, 77);
  stroke("lightgreen");
  ladder(51, 90);
  stroke("purple");
  ladder(42, 63);
  stroke("grey");
  ladder(74, 98);
  stroke(0);
  ladder(8, 31);

  stroke("red");
  snake(39, 3);
  stroke("green");
  snake(99, 7);
  stroke("blue");
  snake(88, 48);
  check();
  pop();
}

function ladder(a, b) {
  strokeWeight(5);
  let x1 = (path[a].x * width) / grid;
  let y1 = (path[a].y * height) / grid;
  let x2 = (path[b].x * width) / grid;
  let y2 = (path[b].y * height) / grid;
  let l = dist(x1, y1, x2, y2);
  push();
  translate(x1 + width / grid / 2, y1 + height / grid / 2);
  let angle = find_angle(
    { x: x2, y: y2 },
    { x: width, y: y1 },
    { x: x1, y: y1 }
  );
  rotate(-angle);
  line(0 + 10, 0 - 15, l - 10, 0 - 15);
  line(0 + 10, 0 + 15, l - 10, 0 + 15);
  // console.log(dist(0 + 10, 0 - 15, l - 10, 0 - 15), l - 20);
  for (var i = 20; i < l - 25; i += 20) {
    line(0 + 10 + i, 0 - 15, 0 + 10 + i, 0 + 15);
  }
  pop();
}

function snake(a, b) {
  let x1 = (path[a].x * width) / grid;
  let y1 = (path[a].y * height) / grid;
  let x2 = (path[b].x * width) / grid;
  let y2 = (path[b].y * height) / grid;
  noFill();
  let l = dist(x1, y1, x2, y2) * 2;
  let xbuff = 10;
  let ybuff = 40;
  strokeWeight(10);
  curve(
    x1 + l + xbuff,
    y1 - l + ybuff,
    x1 + xbuff,
    y1 + ybuff,
    x2 + xbuff,
    y2 + ybuff - 20,
    x2 - l + xbuff,
    y2 + l + ybuff
  );

  push();
  translate(x1 + xbuff, y1 + ybuff);
  rotate(
    find_angle(
      { x: x1 + l + xbuff, y: y1 - l + xbuff },
      { x: width, y: y1 },
      { x: x1 + xbuff, y: y1 + ybuff }
    )
  );
  ellipse(0, 0, 10, 20);
  pop();
}
function find_angle(p0, p1, c) {
  var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2)); // p0->c (b)
  var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) + Math.pow(c.y - p1.y, 2)); // p1->c (a)
  var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2)); // p0->p1 (c)
  return Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c));
}

function change(pl) {
  let d = dice();
  if (Array.from(document.getElementById("dice").classList).includes("roll")) {
    if (pl === "p") {
      if (p.pos !== 0) {
        if (p.pos + d <= 100) {
          p.pos += d;
          document.getElementById("p").style["top"] =
            (path[p.pos].y * height) / grid + yb + 50 - 20 + "px";
          document.getElementById("p").style["left"] =
            path[p.pos].x * (width / grid) + xb + p.off + 30 + "px";

          if (portals[p.pos]) {
            p.pos = portals[p.pos];
          }
        }
      } else if (d === 1) {
        p.pos = 1;
      }
    }
    document.getElementById("dice").classList = ["dice"];
    document.getElementById("dice").classList.add("d" + d.toString());
    if (pl === "p") {
      setTimeout(() => {
        change("");
        setTimeout(() => {
          document.getElementById("dice").classList = ["dice"];
          document.getElementById("dice").classList.add("roll");
        }, 1000);
      }, 1000);
    }
  }
  if (pl !== "p") {
    if (c.pos !== 0) {
      if (c.pos + d <= 100) {
        c.pos += d;
        document.getElementById("p").style["top"] =
          (path[p.pos].y * height) / grid + yb + 50 - 20 + "px";
        document.getElementById("p").style["left"] =
          path[p.pos].x * (width / grid) + xb + p.off + 30 + "px";

        if (portals[c.pos]) {
          c.pos = portals[c.pos];
        }
      }
    } else if (d === 1) {
      c.pos = 1;
    }
    document.getElementById("dice").classList = ["dice"];
    document.getElementById("dice").classList.add("d" + d.toString());
  }
}

function check() {
  if (p.pos === 100) {
    background(255, 100);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("YOU WON", width / 2, height / 2);
    noLoop();
  }
  if (c.pos === 100) {
    background(255, 100);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("YOU LOST", width / 2, height / 2);
    noLoop();
  }
}

function dice() {
  return floor(random(0, 6)) + 1;
}
