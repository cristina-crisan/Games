const baseUrl = "https://games-api-siit.herokuapp.com";

Games = function Games(options = {}) {
  this.id = options.id;
};

Games.prototype.getAll = function () {
  return fetch(baseUrl + "/games")
    .then(function (response) {
      return response.json();
    });
}

Games.prototype.delete = function (gameId) {
  let url = baseUrl + "/games/" + gameId;
  return fetch(url, {
    method: "DELETE"
  }).then(function (response) {
    return response.text();
  });
}

Games.prototype.editGame = function (gameId, titleValue, descriptionValue, imageValue) {
  let url = baseUrl + "/games/" + gameId;
  let data = {
    title: titleValue,
    description: descriptionValue,
    imageUrl: imageValue
  };
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function (response) {
    return response.json();
  });
};

Games.prototype.addGame = function (gameTitle, gameDescription, gameImageUrl) {
  let url = baseUrl + "/games";
  let data = {
    title: gameTitle,
    description: gameDescription,
    imageUrl: gameImageUrl
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(function (response) {
    return response.json();
  });
};

Games.prototype.regenerateGames = function () {
  return fetch(baseUrl + "/regenerate-games");
};


Games.prototype.getGame = function () {
  return fetch(baseUrl + "/games/" + this.id).then(function (response) {
    console.log("response", response);
    return response.json();
  });
};


