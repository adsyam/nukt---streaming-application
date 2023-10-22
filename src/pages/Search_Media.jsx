import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loader_Geometric } from "../assets"
import { Navbar2, SearchMovie, SearchTVSeries } from "../components"
import { TOKEN_AUTH } from "../constants/apiConfig"

export default function SearchPage() {
  const { query } = useParams()
  const [loading, setLoading] = useState(true)
  const [movieData, setMovieData] = useState([])
  const [tvData, setTvData] = useState([])
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: `${query}`,
        include_adult: "false",
        language: "en-US",
        page: "1,2,3",
      },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setMovieData(
          response.data.results.filter((md) => md.media_type === "movie")
        )
        setTvData(response.data.results.filter((md) => md.media_type === "tv"))
        setAnimationKey((prevKey) => prevKey + 1)
        setTimeout(() => {
          setLoading(false)
        }, 1300)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [query])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <Navbar2 />
      {!loading ? (
        <>
          <div className="text-white my-12 ">
            <section className="flex gap-1 mx-12">
              <p>Showing results for</p>
              <p className="text-[#398FDD]">&quot;{query}&quot;</p>
            </section>
            <section className="mb-12 ">
              <h2 className="mx-12">Movie</h2>
              <div className="grid grid-cols-10 mx-12 gap-4">
                {movieData
                  .filter((md) => md.poster_path && md.backdrop_path)
                  .map((md, index) => (
                    <SearchMovie
                      key={index}
                      MovieID={md.id}
                      index={index}
                      poster={md.poster_path}
                      backdrop={md.backdrop_path}
                      title={md.original_title}
                      date1={md.release_date}
                      date2={md.first_air_date}
                      animation={fadeInVariants}
                    />
                  ))}
              </div>
            </section>
            <section className="mb-12 ">
              <h2 className="mx-12">TV Series</h2>
              <div className="grid grid-cols-10 mx-12 gap-4">
                {tvData
                  .filter((tv) => tv.poster_path && tv.backdrop_path)
                  .map((tv, index) => (
                    <SearchTVSeries
                      key={index}
                      tvID={tv.id}
                      index={index}
                      poster={tv.poster_path}
                      backdrop={tv.backdrop_path}
                      title={tv.original_name}
                      date1={tv.release_date}
                      date2={tv.first_air_date}
                      animation={fadeInVariants}
                    />
                  ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <div key={animationKey}>
          <Player
            autoplay
            loop
            src={loader_Geometric}
            className="h-[35vh] flex items-center justify-center"
          ></Player>
        </div>
      )}
    </>
  )
}
