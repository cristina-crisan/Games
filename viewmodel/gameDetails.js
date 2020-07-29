let gameId = getQueryValue("id");
let game = new Games({ id: gameId });

game.getGame().then(function (data) {
  displayGame(data);
})

function displayGame(data) {
  let titleGame = document.querySelector("h3");
  let descriptionGame = document.querySelector(".description");
  let genreGame = document.querySelector(".genre");
  let imageGame = document.querySelector("img");
  imageGame.src = data.imageUrl;
  let publisherGame = document.querySelector(".publisher");
  let releaseDate = document.querySelector(".releaseDate");

  titleGame.innerText = data.title;
  descriptionGame.innerText = data.description;
  imageGame.innerText = data.imageUrl

  genreGame.innerText = data.genre;
  publisherGame.innerText = data.publisher;
  releaseDate.innerText = data.releaseDate;
}

let backButton = document.querySelector(".back-button");
backButton.addEventListener("click", function () {
  window.location.href = "games.html";
});

function getQueryValue(key) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

