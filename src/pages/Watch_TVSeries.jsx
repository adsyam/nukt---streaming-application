import { useParams } from "react-router"
import {
  EpisodeList,
  Footer,
  MediaDetails,
  MediaFrame,
  MediaReviews,
  Navbar2,
} from "../components"

export default function WatchTVSeries() {
  const { id, Season, Episode } = useParams()

  return (
    <>
      <Navbar2 />
      <MediaFrame id={id} Season={Season} Episode={Episode} />
      <div className="flex mx-12 justify-center gap-4">
        <EpisodeList id={id} Season={Season} />
        <MediaDetails id={id} Season={Season} Episode={Episode} />
      </div>
      <MediaReviews id={id} />
      <Footer />
    </>
  )
}
