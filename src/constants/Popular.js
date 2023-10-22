import axios from "axios";
import { TOKEN_AUTH } from "../API/tmdbAPI";

// https://developer.themoviedb.org/reference/movie-popular-list
// Get a list of popular movies

const getPopularMovie = () => {
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: { language: "en-US", page: `${}` },
  headers: {
    accept: "application/json",
    Authorization:
        `${TOKEN_AUTH}`
  },
}

axios
  .request(options)
  .then(function (response) {
    console.log(response.data.results)
  })
  .catch(function (error) {
    console.error(error)
  })
}

const popularMovieResults = () => {
    
}