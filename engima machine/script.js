let alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let pervals = [
  [
    17,
    9,
    12,
    3,
    0,
    5,
    15,
    6,
    16,
    25,
    10,
    20,
    21,
    8,
    23,
    22,
    13,
    18,
    1,
    19,
    2,
    14,
    4,
    24,
    7,
    11,
  ],
  [
    15,
    1,
    2,
    19,
    6,
    3,
    20,
    7,
    10,
    16,
    5,
    0,
    23,
    22,
    9,
    14,
    17,
    18,
    12,
    4,
    13,
    11,
    24,
    25,
    21,
    8,
  ],
  [
    22,
    2,
    23,
    4,
    13,
    17,
    9,
    12,
    1,
    20,
    14,
    0,
    7,
    16,
    11,
    6,
    19,
    18,
    10,
    3,
    5,
    24,
    25,
    8,
    15,
    21,
  ],
];

let gear1 = pervals[0].slice();
let gear2 = pervals[1].slice();
let gear3 = pervals[2].slice();

let one = 0;
let two = 0;
let three = 0;

let mode = "encoder";

function spin(arr, n) {
  for (var i = 0; i < n; i++) {
    arr.unshift(arr.pop());
  }
}

function encode(l) {
  index = -1;
  for (var i = 0; i < alphabets.length; i++) {
    if (alphabets[i] === l.toLowerCase()) {
      index = i;
      break;
    }
  }

  three++;
  if (three === 25) {
    three = 0;
    two++;
    if (two === 25) {
      two = 0;
      one++;
      if (one === 25) {
        one === 0;
      }
    }
  }

  gear3 = pervals[2].slice();
  spin(gear3, three);
  gear2 = pervals[1].slice();
  spin(gear2, two);
  gear1 = pervals[0].slice();
  spin(gear1, one);

  if (index !== -1) {
    return alphabets[gear3[gear2[gear1[index]]]];
  } else {
    return l;
  }
}
function decode(l) {
  index = -1;
  for (var i = 0; i < alphabets.length; i++) {
    if (alphabets[i] === l.toLowerCase()) {
      index = i;
      break;
    }
  }

  three++;
  if (three === 25) {
    three = 0;
    two++;
    if (two === 25) {
      two = 0;
      one++;
      if (one === 25) {
        one = 0;
      }
    }
  }

  gear3 = pervals[2].slice();
  spin(gear3, three);
  gear2 = pervals[1].slice();
  spin(gear2, two);
  gear1 = pervals[0].slice();
  spin(gear1, one);
  if (index !== -1) {
    return alphabets[gear1.indexOf(gear2.indexOf(gear3.indexOf(index)))];
  } else {
    return l;
  }
}

function encodeText(s) {
  let result = "";
  for (var i = 0; i < s.length; i++) {
    result += encode(s.charAt(i));
  }
  set();
  return result;
}
function decodeText(s) {
  let result = "";
  for (var i = 0; i < s.length; i++) {
    result += decode(s.charAt(i));
  }
  set();
  return result;
}

function change(n, amt) {
  if (n === "one") {
    one += amt;
  }
  if (n === "two") {
    two += amt;
  }
  if (n === "three") {
    three += amt;
  }
  if (one < 0) {
    one = 26;
  }
  if (two < 0) {
    two = 26;
  }
  if (three < 0) {
    three = 26;
  }

  if (one > 26) {
    one = 0;
  }
  if (two > 26) {
    two = 0;
  }
  if (three > 26) {
    three = 0;
  }
  set();
}
function set() {
  document.getElementById("one").innerHTML = one;
  document.getElementById("two").innerHTML = two;
  document.getElementById("three").innerHTML = three;
}
function changeFormat() {
  let e = document.getElementById("mode");
  e.classList.toggle("decode");
  document.getElementById("encoder").classList.toggle("select");
  document.getElementById("decoder").classList.toggle("select");
  document.getElementById("encode-button").classList.toggle("select");
  if (mode === "decoder") {
    mode = "encoder";
  } else if (mode === "encoder") {
    mode = "decoder";
  }
}
document.getElementById("encode-button").addEventListener("click", () => {
  let input = document.getElementById("input");
  let output = document.getElementById("output");
  let result = "";
  if (mode === "encoder") {
    result = encodeText(input.value);
  } else {
    result = decodeText(input.value);
  }
  output.innerHTML = result;
});

function copy() {
  var Url = document.createElement("textarea");
  Url.value = document.getElementById("output").innerHTML;
  document.body.appendChild(Url)
  Url.select();
  document.execCommand("copy");
  document.body.removeChild(Url)
}
