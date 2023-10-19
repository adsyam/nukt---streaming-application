import { Ripples } from "@uiball/loaders"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { Navbar, ReviewSection } from "../components"
import Navbar2 from "../components/Navbar2"
import { motion } from "framer-motion"


export default function SeriesPage() {
  const { id } = useParams()
console.log(id)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      <Navbar2 />
      <div className="flex items-center justify-center m-10 pt-1">
        <div className="flex items-center justify-center w-screen h-[90vh] rounded-[10px] border-[#398FDD] border-2 ">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Ripples size={45} speed={2} color="#398FDD" />
            </div>
          ) : (
            <iframe
              title="Movie Embed"
              src={`https://vidsrc.me/embed/movie?tmdb=1399/`}
              frameBorder={0}
              allowFullScreen
              className="aspect-video w-full h-full rounded-[10px]"
            />
          )}
        </div>
      </div>
      {/* <MovieDescription/> */}
      <ReviewSection />
    </>
  )
}
