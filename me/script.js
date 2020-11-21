let questions = [
  {
    question: "What is my favourite colour ?",
    options: ["red", "green", "violet", "yellow"],
    answer: 3,
  },
  {
    question: "What is the subject I like the most ?",
    options: ["history", "computer", "geography", "chemistry", "physics"],
    answer: 1,
  },
  {
    question: "What is the thing of the following I like the most ?",
    options: ["adventure", "science fiction", "detective"],
    answer: 2,
  },
  {
    question: "What is my hobby ?",
    options: ["collecting stamps", "rubix cube", "coding"],
    answer: 1,
  },
  {
    question: "What is my favourite food ?",
    options: ["fish", "mutton", "chicken"],
    answer: 0,
  },
  {
    question: "Who is my best friend ? (I bet you would get this correct)",
    options: ["EVERYONE"],
    answer: 0,
  },
];
let index = 0;
let correct = 0;

function setQ(q) {
  question = document.getElementById("question");
  question.innerHTML = q.question;
  options = document.getElementById("options");
  options.innerHTML = "";
  for (i of q.options) {
    let btn = document.createElement("button");
    btn.onclick = click;
    btn.innerHTML = i;
    options.append(btn);
  }
}
setQ(questions[index]);

function click(e) {
  questions[index].choice = e.path[0].innerHTML;
  if (
    questions[index].options[questions[index].answer] === e.path[0].innerHTML
  ) {
    correct++;
  }
  if (index < questions.length - 1) {
    index++;
    setQ(questions[index]);
  } else {
    document.getElementById("container").style["color"] = "yellow";
    res = "RESULT : "
    document.getElementById("question").innerHTML = res;
    options = document.getElementById("options");
    options.innerHTML = "";
    let result = document.getElementById("result");
    document.body.classList.remove("result");
    result.append("SCORE : " + correct + "/" + questions.length);
    result.append(document.createElement("br"));
    for (i of questions) {
      result.append(document.createElement("br"));
      result.append(i.question);
      result.append(document.createElement("br"));
      result.append(document.createElement("br"));
      for (var k = 0; k < i.options.length; k++) {
        j = i.options[k];
        let span = document.createElement("span");
        span.innerHTML = k + 1 + `) ` + j + "    ";
        result.append(span);
      }
      result.append(document.createElement("br"));
      result.append(document.createElement("br"));
      result.append("ANSWER : " + i.options[i.answer]);
      result.append(document.createElement("br"));
      result.append("You chose : " + i.choice);
      result.append(document.createElement("br"));
      result.append(document.createElement("br"));
      result.append(document.createElement("br"));
    }
  }
}
