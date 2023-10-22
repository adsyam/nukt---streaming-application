import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
// import Trailer from "./trailer"
import { TOKEN_AUTH } from "../../constants/apiConfig"

export default function MovieDescription() {
    const {id} = useParams()
  const [movieDetail, setMovieDetail] = useState([])
//   console.log(movieDetail)

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN_AUTH}`,
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
    <div className="text-white">
      <h1 className="text-4xl font-medium">{movieDetail.original_title}</h1>
      <p className="text-sm">{movieDetail.overview}</p>
      {/* <Trailer id={id}/> */}
    </div>
  )
}
