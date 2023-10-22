import { useParams } from "react-router"
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

  return (
    <>
      <Navbar />
      <MediaFrame id={id} Season={Season} Episode={Episode} />
      <div className="flex mx-24 justify-center gap-4">
        <EpisodeList id={id} Season={Season} />
        <ServerList id={id} Season={Season} />
        <MediaDetails id={id} Season={Season} Episode={Episode} />
      </div>
      <MediaReviews id={id} />
      <Footer />
    </>
  )
}
