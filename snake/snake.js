function Snake() {
  this.body = [];
  this.length = 1;
  this.dir = { x: 1, y: 0 };
  this.body.push(vector(0, 0));
  this.update = () => {
    this.body.unshift(vector(this.body[0].x, this.body[0].y));
    add(this.body[0], this.dir);
    this.eat(f);
    if (this.body.length > this.length) {
      this.body.pop();
    }
    this.body[0].x = constrain(this.body[0].x, 0, grid - 1);
    this.body[0].y = constrain(this.body[0].y, 0, grid - 1);

    this.die();
  };
  this.die = () => {
    for (var i = 1; i < this.body.length; i++) {
      if (compare(this.body[0], this.body[i])) {
        textSize(100);
        textAlign(CENTER, CENTER);
        stroke(0);
        strokeWeight(2);
        text("❌END", width / 2, height / 2);
        noLoop();
      }
    }
  };
  this.eat = (f) => {
    if (compare(this.body[0], f)) {
      this.length++;
      food();
    }
  };
  this.show = () => {
    for (var i = 0; i < this.body.length; i++) {
      noStroke();
      fill(0);
      rect(this.body[i].x * cols, this.body[i].y * rows, cols, rows);
    }
  };
}
function add(a, b) {
  a.x += b.x;
  a.y += b.y;
}
function compare(a, b) {
  if (a.x === b.x && a.y === b.y) {
    return true;
  } else {
    return false;
  }
}
