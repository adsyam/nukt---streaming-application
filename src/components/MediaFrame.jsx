import { useState, useEffect } from "react"
import { Ripples } from "@uiball/loaders"


export default function MediaFrame({id, Season, Episode}) {
const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="flex items-center justify-center m-10 pt-1 mt-24">
      <div className="flex items-center justify-center w-screen h-[90vh] rounded-[10px] border-[#ffffff30] border-2 ">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Ripples size={45} speed={2} color="#398FDD" />
          </div>
        ) : (
          <iframe
            title={{}}
            src={`https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${Season}&e=${Episode}`}
            frameBorder={0}
            allowFullScreen
            className="aspect-video w-full h-full rounded-[10px]"
          />
        )}
      </div>
    </div>
  )
}
