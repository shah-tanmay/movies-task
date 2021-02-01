const path = require("path");
const express = require("express");
const app = express();
const getMovieDetails = require("./utils/movieDetails");

const viewsPath = path.join(__dirname, "../templates/views");

// app.use(express.static(publicDirectoryPath));

app.use("/static", express.static(path.join(__dirname, "../static")));

// app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Movies",
  });
});

app.get("/movies", (req, res) => {
  if (!req.query.moviename) {
    return res.send({
      error: "Please enter the name of the movie",
    });
  }
  getMovieDetails(req.query.moviename, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      ReleaseDate: data.ReleaseDate,
      Language: data.Language,
      Rating: data.Rating,
      Overview: data.Overview,
      Image: data.Image,
    });
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
