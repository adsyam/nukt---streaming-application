import { Ripples } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { MovieDescription, ReviewSection } from "../components"
import Navbar2 from "../components/Navbar2"
import Trailer from "../components/Movies/trailer"
import MovieDetails from "../components/Watch_Movie/Movie_Details"
import MovieReviews from "../components/Watch_Movie/Movie_Reviews"
import Footer from "../components/Footer"

export default function WatchMovie() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      <Navbar2 />
      <section className="flex items-center justify-center m-10 pt-1">
        <div className="flex items-center justify-center w-screen h-[90vh] rounded-[10px] border-[#398FDD] border-2 ">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Ripples size={45} speed={2} color="#398FDD" />
            </div>
          ) : (
            <iframe
              title="Movie Embed"
              src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
              frameBorder={0}
              allowFullScreen
              className="aspect-video w-full h-full rounded-[10px]"
            />
          )}
        </div>
      </section>
      <MovieDetails id={id}/>
      <MovieReviews id={id}/>
      <Footer />

    </>
  )
}
