import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function MovieDescription() {
    const {id} = useParams()
  const [movieDetail, setMovieDetail] = useState(null)
//   console.log(movieDetail)

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
        // console.log(response.data)
        setMovieDetail(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [id])
  return (
    <div className="text-white">
      <p>{movieDetail.original_title}</p>
      <p>{movieDetail.overview}</p>
    </div>
  )
}
