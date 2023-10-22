import React, { useEffect, useState } from "react"

const Movie = () => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmYzMzZmYzc2MzIyMDIyYmY0OTdiZmYwMmRiZWQ1YSIsInN1YiI6IjY1MjQwYTE2MGNiMzM1MTZmNjNiMTZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5E0K7l1TaIxgmhI98EM6y2mvcmuLcJTxdlRHI8u5Qac",
      },
    }

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error(err))
  }, [])
  console.log(movieList)
  return (
    <div className="flex">
      {movieList.map((movie) => (
        <>
          <img
            width={215}
            height={322.5}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            key={movie.id}
          />
          <p>{movie.id}</p>
        </>
      ))}
    </div>
  )
}

export default Movie
