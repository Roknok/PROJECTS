let vh;
let rr = false;
let rl = false;
let ru = false;
let asters = [];
let lives = 5;
let win;
let fail;
let bulletsound;
let smartbullets = 0;
let normalbullets = Infinity;
let shields = 0;
let notstarted = true;
let interval;
let startbutton = document.getElementById("start");
let asteroidsnumber = 100;

function preload() {
  win = loadSound("winsound.mp3");
  fail = loadSound("failsound.mp3");
  bulletsound = loadSound("bulletsound.mp3");
}

function redirect(link) {
  let a = document.createElement("a")
  a.href = link
  a.click()
}

function stop() {
  clearInterval(interval);
}

function setup() {
  params = getURLParams();
  document.getElementById("next").addEventListener("click", () => {
    let l = location
    let link = l.href.split("?")[0]
   
    if (params.level) {
     redirect(link + "?level=" + (parseFloat(params.level) + 1));
   } else {
     redirect(link + "?level=" + 2);
   }
  });

  if (params.level) {
    asteroidsnumber = 90;
    asteroidsnumber += params.level * 10;
    shields += params.level * 1;
    smartbullets += params.level * 10;
  } else {
    asteroidsnumber = 100;
    shields = 2;
    smartbullets = 10;
  }

  createCanvas(windowWidth, windowHeight);
  background(220);
  textAlign(CENTER);
  textSize(50);
  text("INSTRUCTIONS", width / 2, 170);
  textSize(25);
  text("Press the up arrow key to move forward.", width / 2, 220);
  text("Use the left and right arrow keys to turn.", width / 2, 260);
  text(`Press the key "n" to shoot normal bullets`, width / 2, 320);
  text(`Press the key "s" to shoot smart bullets`, width / 2, 360);
  text(`Press the key "p" to protect against asteroids`, width / 2, 400);

  startbutton.addEventListener("click", run);

  vh = new Vehicle(width / 2, height / 2);
  angleMode(DEGREES);
  for (var i = 0; i < asteroidsnumber; i++) {
    asters[i] = new Asteroid();
  }
}
function run() {
  if (notstarted) {
    startbutton.style["display"] = "none";
    notstarted = false;
    background(220);
    interval = setInterval(() => {
      start();
    }, 30);
  }
}

function start() {
  background(100, 50);
  for (var i = 0; i < asters.length; i++) {
    asters[i].show();
  }
  vh.show();
  if (rr) {
    vh.rot++;
  }
  if (rl) {
    vh.rot--;
  }
  if (ru) {
    if (vh.rot < 180) {
      vh.add(
        map(vh.rot, 0, 180, 1, -1),
        vh.rot < 90
          ? 1 - map(vh.rot, 0, 180, 1, -1)
          : 1 + map(vh.rot, 0, 180, 1, -1)
      );
    }
    if (vh.rot >= 180) {
      vh.add(
        map(360 - vh.rot, 0, 180, 1, -1),
        360 - vh.rot <= 90
          ? -1 + map(360 - vh.rot, 0, 180, 1, -1)
          : -1 - map(360 - vh.rot, 0, 180, 1, -1)
      );
    }
  }
  fill(0);
  stroke(0);
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(30);
  fill(0);
  strokeWeight(1);
  text("Asteroids : " + nf(asters.length, 3), width - 210, 40);
  textSize(23);
  noFill();
  stroke(0, 255, 0);
  rect(width - 210, 50, 205, 100);
  fill(0);
  stroke("black");
  noStroke();
  text("BULLETS:", width - 200, 80);
  textSize(17);
  text("NORMAL : " + normalbullets, width - 200, 100);
  text("SMART : " + smartbullets, width - 200, 120);
  text("SHIELDS : " + shields, width - 200, 140);

  let hearts = "";
  for (var i = 0; i < lives; i++) {
    hearts += "💖";
  }
  textSize(30);
  text("Lives : " + hearts, 10, 40);

  if (lives === 0) {
    setTimeout(() => {
      stop();
      textAlign(CENTER, CENTER);
      fill("Red");
      textSize(100);
      text("OUT OF LIVES", width / 2, height / 2);
      fail.play();
    }, 1000);
  }
  if (asters.length === 0) {
    setTimeout(() => {
      stop();
      textAlign(CENTER, CENTER);
      fill("Red");
      textSize(100);
      text("YOU WON !", width / 2, height / 2);
      document.getElementById("next").style["display"] = "block";
      win.play();
    }, 1000);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    rr = true;
  }
  if (keyCode === LEFT_ARROW) {
    rl = true;
  }
  if (keyCode === UP_ARROW) {
    ru = true;
  }
  if (key === "n" || key === "N") {
    vh.shoot("n");
  }
  if (key === "s" || key === "S") {
    vh.shoot("s");
  }
  if (key === "p" || key === "P") {
    vh.protect();
  }
}
function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    rr = false;
  }
  if (keyCode === LEFT_ARROW) {
    rl = false;
  }
  if (keyCode === UP_ARROW) {
    ru = false;
  }
}

function Vehicle(x, y) {
  this.protection = false;
  this.time = 10000;
  this.pos = createVector(x, y);
  this.rot = 0;
  this.inter = 500;
  this.permi = true;
  this.bullets = [];
  this.show = () => {
    push();
    stroke(255);
    strokeWeight(1);
    fill(100);
    translate(this.pos.x, this.pos.y);
    rotate(this.rot);
    rotate(90);
    triangle(0, -45, -30, 30, 30, 30);
    if (this.rot < 0 || this.rot > 360) {
      this.rot = 360 - this.rot;
    }
    pop();
    for (b of this.bullets) {
      b.show();
    }
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    strokeWeight(1);
    stroke(255);
    fill(0, 30);
    circle(this.pos.x, this.pos.y, 90);
    if (this.protection) {
      noStroke();
      fill(0, 255, 0, 50);
      circle(this.pos.x, this.pos.y, 120);
    }

    for (var i = 0; i < asters.length; i++) {
      if (this.protection) {
        let d = dist(asters[i].pos.x, asters[i].pos.y, this.pos.x, this.pos.y);
        if (d < 60 + asters[i].dir / 2) {
          asters.splice(i, 1);
        }
      } else {
        let d = dist(asters[i].pos.x, asters[i].pos.y, this.pos.x, this.pos.y);
        if (d < 40 + asters[i].dir / 2) {
          lives--;
          asters.splice(i, 1);
        }
      }
    }
  };
  this.add = (a, b) => {
    this.pos.x += a;
    this.pos.y += b;
  };
  this.shoot = (a) => {
    if (this.permi) {
      this.permi = false;
      this.bullets.push(new Bullet(this.pos, this.rot, a));
      bulletsound.play();
      setTimeout(() => {
        this.permi = true;
      }, this.inter);
    }
  };
  this.protect = () => {
    if (!this.protection && shields !== 0) {
      this.protection = true;
      shields--;
      setTimeout(() => {
        this.protection = false;
      }, this.time);
    }
  };
}
function Bullet(pos, rot, t) {
  this.type = t;
  if (this.type === "s") {
    if (smartbullets !== 0) {
      let notfound = true;
      let ind = 0;
      while (notfound) {
        console.log(ind);
        if (ind === asters.length) {
          this.type = "n";
          notfound = false;
          break;
        }
        if (asters[ind].isonscreen() && asters[ind].motion) {
          this.aster = ind;
          smartbullets--;
          notfound = false;
          break;
        }
        ind++;
      }
      if (this.type === "s") {
        asters[this.aster].motion = false;
      }
    } else {
      this.type = "n";
    }
  }
  this.vel = createVector();
  this.acc = createVector();
  this.index = toString(vh.bullets.length);
  this.rtp = createVector(pos.x, pos.y);
  this.pos = createVector(40, 0);
  this.spos = createVector(0 + this.rtp.x, 0 + this.rtp.y);
  this.rot = rot;
  this.show = () => {
    let x = this.rtp.x + this.pos.x * cos(this.rot);
    let y = this.rtp.y + this.pos.x * sin(this.rot);

    if (this.type === "n") {
      this.add(2, 0);
      stroke(0);
      strokeWeight(5);
      point(x, y);
    }
    if (this.type === "s") {
      stroke(0, 255, 0);
      strokeWeight(5);
      point(this.spos.x, this.spos.y);
      try {
        let xi = asters[this.aster].pos.x - this.spos.x;
        let yi = asters[this.aster].pos.y - this.spos.y;
        this.acc.add(createVector(xi, yi));
        this.acc.setMag(500);
        this.vel.limit(3);
        this.spos.add(this.vel);
        this.vel.add(this.acc);
        circle(asters[this.aster].pos.x, asters[this.aster].pos.y, 10);
      } catch {
        this.add(10, 10, true);
      }
    }

    if (x < 0 || x > width || y < 0 || y > height) {
      vh.bullets.splice(parseInt(this.index), 1);
    }
    if (
      this.spos.x < 0 ||
      this.spos.x > width ||
      this.spos.y < 0 ||
      this.spos.y > height
    ) {
      if (this.type !== "s") {
        vh.bullets.splice(vh.bullets.indexOf(this), 1);
      }
    }
    for (var i = 0; i < asters.length; i++) {
      let d;
      d = dist(asters[i].pos.x, asters[i].pos.y, x, y);
      if (this.type === "s") {
        d = dist(asters[i].pos.x, asters[i].pos.y, this.spos.x, this.spos.y);
      }
      if (d < asters[i].dir / 2) {
        asters.splice(i, 1);
        if (this.type === "s" && i === this.aster) {
          vh.bullets.splice(vh.bullets.indexOf(this), 1);
        }
      }
    }
  };
  this.add = (a, b, c) => {
    if (!c) {
      this.pos.x += a;
      this.pos.y += b;
    }
    if (c) {
      this.spos.x += a;
      this.spos.y += b;
    }
  };
}
function Asteroid() {
  this.motion = true;
  this.pos = createVector(random(-width * 8, width * 8), random(-700, -200));
  this.dir = random(40, 70);
  this.xoff = random(1000);
  this.show = () => {
    stroke(255);
    fill(0, 50);
    strokeWeight(1);
    circle(this.pos.x, this.pos.y, this.dir);
    // if (this.motion) {
    this.pos.x += map(noise(this.xoff), 0, 1, -5, 5);
    this.pos.y += map(noise(this.xoff + 1000), 0, 1, -2, 2);
    this.pos.x += (width / 2 - this.pos.x) / 500;
    this.pos.y += (height / 2 + height / 4 - this.pos.y) / 1000;
    this.xoff += 0.01;
    // }
  };
  this.isonscreen = () => {
    if (
      this.pos.x > 0 &&
      this.pos.x < width &&
      this.pos.y > 0 &&
      this.pos.y < height
    ) {
      return true;
    } else {
      return false;
    }
  };
}
