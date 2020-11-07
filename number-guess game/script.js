let code = "hfsdbhksdbvoldfbvosdbsdhofbhbfholsdb ";
let num = 0;
let tries = 0;

function setup() {
  noCanvas();

  let bot = new RiveScript();
  bot.loadFile("brain.rive").then(() => {
    bot.sortReplies();
    num = floor(random(100000));
    bot.reply("local-user", code + num);
  });

  let input = select("#input");
  let output = select("#output");
  let tres = select("#tries");

  input.changed(chat);

  function chat() {
    let chat = input.value();
    bot.reply("local-user", chat).then((reply) => {
      output.html(reply);
      if (parseInt(chat) !== num && !isNaN(parseInt(chat))) {
        tries++;
      }
      tres.html(tries);
    });
  }
}
