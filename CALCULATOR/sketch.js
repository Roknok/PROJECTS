let add = (num) => {
  if (num !== ".") {
    document.getElementById("present").textContent += num;
  }else if (!document.getElementById("present").textContent.includes(".")){
    document.getElementById("present").textContent += num;
  }
};
let clearnum = (all) => {
  if (all) {
    document.getElementById("present").textContent = "";
  } else {
    if (document.getElementById("present").textContent !== "") {
      document.getElementById("present").textContent = document
        .getElementById("present")
        .textContent.slice(0, -1);
    } else {
      document.getElementById("present").textContent = document
        .getElementById("previous")
        .textContent.slice(0, -2);
      document.getElementById("previous").textContent = "";
    }
  }
};
let operate = (operator) => {
  if (document.getElementById("present").textContent !== "" &&  document.getElementById("previous").textContent === "") {
    document.getElementById("previous").textContent =
      document.getElementById("present").textContent + " " + operator;
    document.getElementById("present").textContent = "";
  }else if (document.getElementById("present").textContent !== "" &&  document.getElementById("previous").textContent !== ""){
    equal()
    operate(operator)
  }
};
let equal = ()=>{
  if (document.getElementById("present").textContent !== ""  &&  document.getElementById("previous").textContent){
    let numberandsign = document.getElementById("previous").textContent.split(" ")
    let number = parseFloat(numberandsign[0])
    let sign = numberandsign[1]
    if (sign === "+"){
      document.getElementById("present").textContent = number + parseFloat(document.getElementById("present").textContent)
      document.getElementById("previous").textContent = ""
    }
    if (sign === "-"){
      document.getElementById("present").textContent = number - parseFloat(document.getElementById("present").textContent)
      document.getElementById("previous").textContent = ""
    }
    if (sign === "÷"){
      document.getElementById("present").textContent = number / parseFloat(document.getElementById("present").textContent)
      document.getElementById("previous").textContent = ""
    }
    if (sign === "×"){
      document.getElementById("present").textContent = number * parseFloat(document.getElementById("present").textContent)
      document.getElementById("previous").textContent = ""
    }
  }
}