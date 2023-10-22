import axios from "axios"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"

export default function MovieDetails({ id }) {
  const [movieDetail, setMovieDetail] = useState(null)

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmYzMzZmYzc2MzIyMDIyYmY0OTdiZmYwMmRiZWQ1YSIsInN1YiI6IjY1MjQwYTE2MGNiMzM1MTZmNjNiMTZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5E0K7l1TaIxgmhI98EM6y2mvcmuLcJTxdlRHI8u5Qac",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setMovieDetail(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [id])

  return (
    <div>
      {movieDetail && (
        <div className="text-white bg-[#ffffff10] rounded-md border border-[#ffe9e950] p-3 mx-20">
          <h2 className="text-4xl">{movieDetail.original_title}</h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="rounded-md px-3 bg-[#ffffff10]">
                {movieDetail.runtime}min
              </p>
              <div className="flex items-center gap-1 rounded-md px-3 py-1 ">
                <p>{movieDetail.vote_average.toFixed(1)}</p>
                <img
                  src="https://img.icons8.com/?size=512&id=12246&format=png"
                  alt=""
                  width={30}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h3>Genres:</h3>
              <ul className="flex gap-2">
                {movieDetail.genres.map((genre) => (
                  <li key={genre.id} className="rounded-md px-3 bg-[#ffffff10]">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <h3>Language:</h3>
              <p className="rounded-md px-3 bg-[#ffffff10]">
                {movieDetail.original_language}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3>Production:</h3>
              <ul className="flex gap-2">
                {movieDetail.production_companies.map((pc) => (
                  <li key={pc.id} className="rounded-md px-3 bg-[#ffffff10]">
                    {pc.name}
                  </li>
                ))}
              </ul>
            </div>
            <p>Summary:</p>
            <p>{movieDetail.overview}</p>
            <div className="flex gap-2 rounded-md">
              <button className="rounded-md px-3 py-1 bg-[#ffffff10] border border-[#ffe9e950] hover:bg-[#ffffff20] transition-all">
                WATCH TRAILER
              </button>
              <button className="rounded-md px-3 py-1 bg-[#ffffff10] border border-[#ffe9e950] hover:bg-[#ffffff20] transition-all text-center align-middle">
                <FontAwesomeIcon icon={faBookmark} className=""/>
                &nbsp;ADD TO THE LIBRARY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
