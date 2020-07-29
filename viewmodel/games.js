let games = new Games();

games.getAll().then(function (responseListOfGames) {
  populateHTML(responseListOfGames);
});

function createGame(game, parent) {
  let template = document.getElementById("template");

  let clonedElement = template.cloneNode(true);
  clonedElement.id = game._id;
  clonedElement.classList.add("content-box");
  parent.insertBefore(clonedElement, parent.childNodes[0]);

  let titleElement = clonedElement.querySelector("h3");
  titleElement.innerHTML = game.title;

  let descripionElement = clonedElement.querySelector(".description");
  descripionElement.innerHTML = game.description;

  let imageElement = clonedElement.querySelector("img");
  imageElement.setAttribute("src", game.imageUrl);
  imageElement.classList.add("image-style");

  let linkElement = document.querySelector("a");
  linkElement.href = "gameDetails.html?id=" + game._id;

  let deleteButton = clonedElement.querySelector(".deleteButton");
  deleteButton.addEventListener("click", deleteGameArticle);

  let editButton = clonedElement.querySelector(".editButton");
  editButton.addEventListener("click", openEditModal);
}

function populateHTML(listOfGames) {
  let parentOfList = document.getElementById("articles");
  parentOfList.innerHTML = "";
  for (let i = 0; i < listOfGames.length; i++) {
    let currentGame = listOfGames[i];
    createGame(currentGame, parentOfList);
  }
}

function deleteGameArticle() {
  let article = event.target.parentElement.parentElement;
  let gameId = article.id;
  games.delete(gameId).then(function (data) {
    games.getAll().then(function (responseListOfGames) {
      populateHTML(responseListOfGames);
    });
  });
}

function openEditModal(event) {
  let article = event.target.parentElement.parentElement;
  let gameId = article.id;

  let modal = document.getElementById("myModal");
  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  let closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  let inputId = document.querySelector("[name=id]");
  let inputTitle = document.querySelector("[name=title]");
  let textarea = document.querySelector("textarea");
  let inputImage = document.querySelector("[name=image]");

  inputId.value = gameId;
  inputTitle.value = article.querySelector("h3").innerHTML;
  textarea.value = article.querySelector(".description").innerHTML;
  inputImage.value = article.querySelector("img").src
}

let saveEditButton = document.querySelector(".save-button");
saveEditButton.addEventListener("click", function () {

  let inputId = document.querySelector("[name=id]");
  let inputTitle = document.querySelector("[name=title]");
  let textarea = document.querySelector("textarea");
  let inputImage = document.querySelector("[name=image]");

  let gameId = inputId.value;
  let gameTitle = inputTitle.value;
  let gameDescription = textarea.value;
  let gameImageUrl = inputImage.value;

  let modal = document.getElementById("myModal");
  modal.style.display = "none";

  games.editGame(gameId, gameTitle, gameDescription, gameImageUrl)
    .then(function (responseGame) {
      games.getAll().then(function (responseListOfGames) {
        populateHTML(responseListOfGames);
      });
    });
});

let newGameButton = document.querySelector(".addNewGame");
newGameButton.addEventListener("click", function (event) {
  window.location.href = "addGames.html"
});

let regenerateGameButton = document.querySelector(".regenerate-button");
regenerateGameButton.addEventListener("click", regenerateGames);

function regenerateGames() {
  games.regenerateGames()
    .then(function () {
      location.reload();
    })
}

let searchButton = document.querySelector(".search-Button");
searchButton.addEventListener("click", search);

function search() {
  let searchValue = document.querySelector(".searchValue").value;
  let articles = document.getElementById("articles");
  let titleItems = articles.querySelectorAll("div h3");

  for (let i = 0; i < titleItems.length; i++) {
    let titleElementValue = titleItems[i].innerText;

    let titleElementaLow = titleElementValue.toLowerCase();
    let searchValueLow = searchValue.toLowerCase();

    titleItems[i].classList.remove("selected");
    if (titleElementaLow.indexOf(searchValueLow) > -1) {
      titleItems[i].scrollIntoView();
      titleItems[i].classList.add("selected");
      break;
    }
  }
}

