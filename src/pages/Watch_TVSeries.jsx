import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Player } from "@lottiefiles/react-lottie-player"
import { loader_Geometric } from "../assets"

import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaReviews,
  Navbar,
  ServerList,
} from "../components"

export default function WatchTVSeries() {
  const { id, Season, Episode } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [id])

  return (
    <>
      <Navbar />
      <MediaFrame id={id} Season={Season} Episode={Episode} />
      {!loading ? (
        <>
          <div className="flex mx-24 justify-center gap-4">
            <EpisodeList id={id} Season={Season} />
            <ServerList id={id} Season={Season} />
            <MediaDetails id={id} Season={Season} Episode={Episode} />
          </div>
          <MediaReviews id={id} />
          <Footer />
        </>
      ) : (
        <Player
          autoplay
          loop
          src={loader_Geometric}
          className="h-[35vh] flex items-center justify-center"
        ></Player>
      )}
    </>
  )
}
