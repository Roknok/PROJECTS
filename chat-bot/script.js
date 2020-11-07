let bot;

function setup() {
  noCanvas();

  bot = new RiveScript();
  bot.loadFile("brain.rive").then(() => {
    bot.sortReplies();
  });
}

function toggletheme() {
  getEle("header").classList.toggle("dark");
  getEle("title").classList.toggle("dark");
  getEle("form").classList.toggle("dark");
  document.body.classList.toggle("dark");

  function getEle(id) {
    return document.getElementById(id);
  }
}

let color = 260;
let tcolor = 100;

$("form").submit((e) => {
  e.preventDefault();
  let li = document.createElement("li");
  li.innerHTML = $("#m").val();
  li.id = "me";
  let time = document.createElement("span");
  time.id = "time";
  li.append(time);
  li.style.backgroundColor = "hsl(" + color + ", 50%, 50%)";
  li.style.borderBottomColor = "hsl(" + color + ", 50%, 50%)";
  $("#messages").append(li);
  window.scrollTo(0, document.body.scrollHeight);
  Reply($("#m").val());
  $("#m").val("");
});
function Reply(a) {
  bot.reply("local-user",a).then((r) => {
    let li = document.createElement("li");
    li.append(r);
    li.id = "other";
    li.style.backgroundColor = "hsl(" + tcolor + ", 50%, 50%)";
    li.style.borderBottomColor = "hsl(" + tcolor + ", 50%, 50%)";
    $("#messages").append(li);
    window.scrollTo(0, document.body.scrollHeight);
  });
}
