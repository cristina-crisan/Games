let game = new Games();

let inputTitle = document.querySelector("[name=title]");
let textarea = document.querySelector("textarea");
let inputImage = document.querySelector("[name=image]");

let saveButton = document.querySelector(".saveButton");
saveButton.addEventListener("click", function () {

  let gameTitle = inputTitle.value;
  let gameDescription = textarea.value;
  let gameImageUrl = inputImage.value;
  game.addGame(gameTitle, gameDescription, gameImageUrl)
    .then(function (responseGame) {
      window.location.href = "games.html";
    });
});

let cancelButton = document.querySelector(".cancelButton");
cancelButton.addEventListener("click", function () {
  window.location.href = "games.html";
})