const request = require("request");

const getMovieDetails = (movieName, callback) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=f3367552a416a62ac3064b45dc046612&query=" +
    encodeURIComponent(movieName);
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (response.body.errors) {
      callback("Unable to find the movie", undefined);
    } else {
      callback(undefined, {
        ReleaseDate: response.body.results[0].release_date,
        Language: response.body.results[0].original_language,
        Rating: response.body.results[0].vote_average,
        Overview: response.body.results[0].overview,
        Image: response.body.results[0].poster_path,
      });
    }
  });
};

module.exports = getMovieDetails;
