let array = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let win;
let parray;
let zero = 0;
let check = false;
let count = 0;
let size=64;
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  number();
}
function copyc(arr) {
  this.arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      this.arr[i][j] = arr[i][j];
    }
  }
  return this.arr;
}
function compare(a, b) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    parray = copyc(array);
    for (var i = 0; i < 4; i++) {
      array[i] = arrange(array[i]);
      array[i] = combine(array[i]);
      array[i] = arrange(array[i]);
    }
    let changed = compare(parray, array);
    if (changed) {
      number();
      count++;
      check = false;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    parray = copyc(array);
    for (var i = 0; i < 4; i++) {
      array[i] = arrange(array[i]);
      array[i] = combine(array[i]);
      array[i] = arrange2(array[i]);
    }
    let changed = compare(parray, array);
    if (changed) {
      number();
      count++;
      check = false;
    }
  }
  if (keyCode === UP_ARROW) {
    parray = copyc(array);
    format(1);
    for (var i = 0; i < 4; i++) {
      array[i] = arrange(array[i]);
      array[i] = combine(array[i]);
      array[i] = arrange(array[i]);
    }
    format(3);
    let changed = compare(parray, array);
    if (changed) {
      number();
      count++;
      check = false;
    }
  }
  if (keyCode === DOWN_ARROW) {
    parray = copyc(array);
    format(1);
    for (var i = 0; i < 4; i++) {
      array[i] = arrange(array[i]);
      array[i] = combine(array[i]);
      array[i] = arrange2(array[i]);
    }
    format(3);
    let changed = compare(parray, array);
    if (changed) {
      number();
      count++;
      check = false;
    }
  }
}
function draw() {
  background(200);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (array[j][i] === 2048) {
        win = true;
      }
      if (array[j][i] !== 0) {
        fill(
          0,
          255 - map(log(array[j][i]) / log(2), 1, 11, 0, 255),
          map(log(array[j][i]) / log(2), 1, 11, 0, 255)
        );
        rect(i * 100, j * 100, 100, 100);
        if (array[j][i]===2048  ||  array[j][i]===1024){
          size=40
        }else if(array[j][i]===128  ||  array[j][i]===256  ||  array[j][i]===512){
          size=50
        }else{
          size=64
        }
        textSize(size);
        fill(0);
        text(array[j][i], i * 100 + 50, j * 100 + 50);
      } else {
        check = true;
        fill(255);
        rect(i * 100, j * 100, 100, 100);
      }
    }
  }
  document.getElementById("moves").innerHTML = "MOVES : " + count;
  if (win === true) {
    fill(0);
    text("YOU WIN !!!", height / 2, width / 2);
    noLoop();
  }
}
function number() {
  var i = floor(random(4));
  var j = floor(random(4));
  var r = random() > 0.3 ? 2 : 4;
  if (array[i][j] === 0) {
    array[i][j] = r;
  } else if (check) {
    number();
  }
}
function arrange(array) {
  for (var i = 0; i < 4; i++) {
    if (array[i] !== 0) {
      zero--;
    }
  }
  array = array.filter(isPositive);

  for (var i = 0; i < zero; i++) {
    array.push(0);
  }
  zero = 0;
  return array;
}
function isPositive(value) {
  zero++;
  return value > 0;
}
function arrange2(array) {
  for (var i = 0; i < 4; i++) {
    if (array[i] !== 0) {
      zero--;
    }
  }
  array = array.filter(isPositive);

  for (var i = 0; i < zero; i++) {
    array.unshift(0);
  }
  zero = 0;
  return array;
}
function isPositive(value) {
  zero++;
  return value > 0;
}

function combine(array) {
  if (array[0] === array[1]) {
    array[0] *= 2;
    array[1] = 0;
  }
  if (array[1] === array[2]) {
    array[1] *= 2;
    array[2] = 0;
  }
  if (array[2] === array[3]) {
    array[2] *= 2;
    array[3] = 0;
  }
  return array;
}
function format(a) {
  for (var k = 0; k < a; k++) {
    this.array = [[], [], [], []];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        this.array[i][j] = array[j][i];
      }
    }
    array = this.array;
  }
}
