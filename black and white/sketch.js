let counter = 0;
let img;
let notfinished = true;
let interval;
let c;
let taken = false;

function setup() {
  let body = select("#body");
  body.dragOver(() => {
    document.body.style["background-color"] = "lightgrey";
  });
  body.dragLeave(() => {
    document.body.style["background-color"] = "white";
  });
  body.drop(
    (d) => {
      if (!taken) {
        taken = true;
        if (d.type === "image") {
          img = createImg(d.data);
          document.body.innerHTML = "";
          //   img.hide();
          start();
        }
      }
    },
    () => {
      document.body.style["background-color"] = "white";
    }
  );
}

function start() {
    c = createCanvas(floor(img.width / img.height * 350), 350);
img.style("opacity", "0");
    background(200)
  image(img, 0, 0, width, height);
  interval = setInterval(() => {
    doit();
  }, 100);
}

function doit() {
  if (notfinished) {
      loadPixels();
    for (var i = 0; i < 100; i++) {
      let b =
        (pixels[counter + 0] + pixels[counter + 1] + pixels[counter + 2]) / 3;
      pixels[counter + 0] = b;
      pixels[counter + 1] = b;
      pixels[counter + 2] = b;
      pixels[counter + 3] = 255;
      counter += 4;
      if (counter >= height * width * 4) {
        notfinished = false;
      }
      }
      updatePixels();
      
  } else {
    clearInterval(interval);
    saveCanvas(c, "black-&-white", "png");
  }
}
