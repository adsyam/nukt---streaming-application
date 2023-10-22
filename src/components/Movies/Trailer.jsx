import axios from "axios"
import { useEffect, useState } from "react"
import { TOKEN_AUTH } from "../../constants/apiConfig"

export default function Trailer({ id }) {
  const [getTrailer, setGetTrailer] = useState([])

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN_AUTH}`,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setGetTrailer(
          response.data.results
            .filter((gt) => gt.type === "Trailer")
            .slice(0, 1)
        )
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return (
    <>
      {/* {getTrailer.map((gt) => (
        <iframe
          key={gt.id}
          title={gt.name}
          src={`https://www.youtube.com/watch?v=${gt.key}`}
          frameBorder={0}
          allowFullScreen
          className="aspect-video w-full h-full rounded-[10px]"
          sandbox="allow-scripts allow-same-origin"
        />
      ))} */}
    </>
  )
}
