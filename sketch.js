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

function left(){
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

function up(){
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

function down(){
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

function right(){
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

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    left()
  }
  if (keyCode === RIGHT_ARROW) {
    right()
  }
  if (keyCode === UP_ARROW) {
    up()
  }
  if (keyCode === DOWN_ARROW) {
    down()
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


function swipedetect(el, callback){
  
  var touchsurface = el,
  swipedir,
  startX,
  startY,
  distX,
  distY,
  threshold = 150, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      e.preventDefault()
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      handleswipe(swipedir)
      e.preventDefault()
  }, false)
}

var body = document.body
swipedetect(body,(dir)=>{
  if (dir = "left"){
    left()
  }
  if (dir = "right"){
    right()
  }
  if (dir = "top"){
    up()
  }
  if (dir = "down"){
    down()
  }
})
//USAGE:

// var el = document.getElementById('swipezone');
// swipedetect(el, function(swipedir){
//   // swipedir contains either "none", "left", "right", "top", or "down"
//   el.innerHTML = 'Swiped <span style="color:yellow;margin: 0 5px;">' + swipedir +'</span>';
// });
