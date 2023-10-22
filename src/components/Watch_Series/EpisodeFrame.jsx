import { useState, useEffect } from "react"
import { Ripples } from "@uiball/loaders"


export default function EpisodeFrame({id, Season, Episode}) {
const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="flex items-center justify-center m-10 pt-1">
      <div className="flex items-center justify-center w-screen h-[90vh] rounded-[10px] border-[#398FDD] border-2 ">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Ripples size={45} speed={2} color="#398FDD" />
          </div>
        ) : (
          <iframe
            title="Movie Embed"
            src={`https://vidsrc.me/embed/tv?tmdb=${id}&season=${Season}&episode=${Episode}`}
            frameBorder={0}
            allowFullScreen
            className="aspect-video w-full h-full rounded-[10px]"
          />
        )}
      </div>
    </div>
  )
}
