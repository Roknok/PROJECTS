hour = new Date().getHours();
let greet = document.getElementById("greet");
if (hour >= 5) {
  greet.textContent = "morning";
}
if (hour >= 12) {
  greet.textContent = "afternoon";
}
if (hour >= 17) {
  greet.textContent = "evening";
}
if (hour >= 24) {
  greet.textContent = "dreams";
}
