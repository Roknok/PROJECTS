let time = document.getElementById("time");
let scramble = document.getElementById("scramble");
let interval;
let atime = 0;
let started = false;
let ds = 0;
let sc = 0;
let mn = 0;
let no = false;
let delay = 0;
let down = 1000;
let willdil = true;
let keyisdown = false;

scramble.innerHTML = setScramble();

document.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    keyisdown = false;
    if (!started && new Date().getTime() - delay > down) {
      started = true;
      atime = new Date().getMilliseconds();
      if (atime.toString().length === 3) {
        atime = atime.toString().charAt(1);
      } else if (atime.toString().length === 2) {
        atime = atime.toString().charAt(0);
      } else if (atime.toString().length === 1) {
        atime = "0";
      }
      time.style["color"] = "black";

      interval = setInterval(() => {
        setTime();
      }, 100);
    } else {
      started = false;
      no = false;
      willdil = true;
    }
  }
});
document.addEventListener("keypress", (e) => {
  if (e.key === " ") {
    keyisdown = true;
    if (started) {
      if (!no) {
        no = true;
        scramble.innerHTML = setScramble();

        clearInterval(interval);

        ms = new Date().getMilliseconds();
        if (ms.toString().length === 3) {
          ms = ms.toString().charAt(1);
        } else if (ms.toString().length === 2) {
          ms = ms.toString().charAt(0);
        } else if (ms.toString().length === 1) {
          ms = "0";
        }

        ms = parseInt(ms) - parseInt(atime);
        if (ms < 0) {
          ms += 10;
        }

        time.innerHTML =
          nf(mn, 2) + ":" + nf(sc, 2) + ":" + nf(ds + ms.toString(), 2);
        let li = document.createElement("li");
        li.innerHTML = time.innerHTML;
        document.getElementById("current").innerHTML = time.innerHTML;
        document.getElementById("times").prepend(li);
        let best = document.getElementById("best");

        if (
          tonum(li.innerHTML) < tonum(best.innerHTML) ||
          best.innerHTML === "-"
        ) {
          best.innerHTML = li.innerHTML;
        }

        // mo3
        function calcmo3() {
          let currentmo3 = document.getElementById("current-mo3");

          if (times.childElementCount >= 3) {
            let accu = 0;
            let arr = times.childNodes;
            for (var i = 0; i < 3; i++) {
              accu += tonum(arr[i].innerHTML);
            }
            currentmo3.innerHTML = totime(accu / 3);

            let mo3 = document.getElementById("mo3");
            if (
              mo3.innerHTML === "-" ||
              tonum(mo3.innerHTML) > tonum(currentmo3.innerHTML)
            ) {
              mo3.innerHTML = currentmo3.innerHTML;
            }
          }
        }
        calcmo3();
        // ao5
        function calcao5() {
          let currentao5 = document.getElementById("current-ao5");
          if (times.childElementCount >= 5) {
            let accu = 0;
            let nodes = times.childNodes;
            let arr = [];
            for (var i = 0; i < 5; i++) {
              arr[i] = tonum(nodes[i].innerHTML);
            }
            for (i of arr) {
              accu += i;
            }

            accu -= Math.min(...arr);
            accu -= Math.max(...arr);
            currentao5.innerHTML = totime(accu / 5);

            let ao5 = document.getElementById("ao5");
            if (
              ao5.innerHTML === "-" ||
              tonum(ao5.innerHTML) > tonum(currentao5.innerHTML)
            ) {
              ao5.innerHTML = currentao5.innerHTML;
            }
          }
        }
        calcao5();
        // ao12
        function calcao12() {
          let currentao12 = document.getElementById("current-ao12");
          if (times.childElementCount >= 12) {
            let accu = 0;
            let nodes = times.childNodes;
            let arr = [];
            for (var i = 0; i < 12; i++) {
              arr[i] = tonum(nodes[i].innerHTML);
            }
            for (i of arr) {
              accu += i;
            }

            accu -= Math.min(...arr);
            accu -= Math.max(...arr);
            currentao12.innerHTML = totime(accu / 12);

            let ao12 = document.getElementById("ao12");
            if (
              ao12.innerHTML === "-" ||
              tonum(ao12.innerHTML) > tonum(currentao12.innerHTML)
            ) {
              ao12.innerHTML = currentao12.innerHTML;
            }
          }
        }
        calcao12();
      }
    } else {
      ds = 0;
      sc = 0;
      mn = 0;

      time.innerHTML = nf(mn, 2) + ":" + nf(sc, 2) + ":" + nf(ds, 2);
      if (willdil) {
        delay = new Date().getTime();
        willdil = false;
        setTimeout(() => {
          if (keyisdown) time.style["color"] = "red";
        }, down);
      }
    }
  }
});

function setTime() {
  time.innerHTML = nf(mn, 2) + ":" + nf(sc, 2) + ":" + nf(ds, 1);
  ds++;
  if (ds === 10) {
    ds = 0;
    sc++;
    if (sc === 60) {
      sc = 0;
      mn++;
    }
  }
}

function setScramble() {
  let moves = [" R", " L", " D", " U", " F", " B", "'", "2"];
  let result = "";
  let p = "";
  for (var i = 0; i < 20; i++) {
    let r = random(moves);
    if ((isspecial(r) && isspecial(p)) || r === p) {
      i -= 2;
    } else {
      result += r;
    }
    p = r;
  }
  if (result.charAt(0) === "'" || result.charAt(0) === "2") {
    result = result.slice(1);
  }
  if (result.charAt(0) === " ") {
    result = result.slice(1);
  }
  return result;
}

function isspecial(a) {
  if (a === "'" || a === "2") {
    return true;
  } else {
    return false;
  }
}

function random(a) {
  let r = Math.floor(Math.random() * a.length);
  return a[r];
}

function nf(t, n) {
  result = t.toString();
  for (var i = 0; i < n - t.toString().length; i++) {
    result = "0" + result;
  }
  return result;
}

function tonum(s) {
  let arr = s.split(":");
  let dsc = parseInt(arr[2]);
  let sec = parseInt(arr[1] * 100);
  let min = parseInt(arr[0] * 10000);

  return dsc + sec + min;
}
function totime(n) {
  let dsc = Math.floor(n % 100);
  let sec = Math.floor((n % 10000) / 100);
  let min = Math.floor(n / 10000);
  return (
    nf(min.toString(), 2) +
    ":" +
    nf(sec.toString(), 2) +
    ":" +
    nf(dsc.toString(), 2)
  );
}

String.prototype.insert = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
