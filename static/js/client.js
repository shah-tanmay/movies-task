const movieform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const image = document.getElementById("image");
movieform.addEventListener("submit", (e) => {
  e.preventDefault();
  const moviename = search.value;
  messageFour.textContent = "Loading....";
  messageOne.innerHTML = "";
  messageThree.innerHTML = "";
  fetch("/movies?moviename=" + moviename).then((response) => {
    response.json().then((data) => {
      if (data.errors) {
        messageOne.textContent = data.errors;
      } else {
        messageFour.innerHTML = "Overview: " + data.Overview;
        messageOne.innerHTML = "Release Date: " + data.ReleaseDate;
        messageThree.innerHTML = "Rating: " + data.Rating;
        image.src = "http://image.tmdb.org/t/p/w185" + data.Image;
        image.width = "150";
        image.height = "150";
      }
    });
  });
});
