import { useParams } from "react-router"
import Navbar2 from "../components/Navbar2"
import EpisodeFrame from "../components/Watch_Series/EpisodeFrame"
import EpisodeList from "../components/Watch_Series/EpisodeList"

export default function WatchTVSeries() {
  const { id, Season, Episode } = useParams()


  return (
    <>
      <Navbar2 />
      <EpisodeFrame id={id} Season={Season} Episode={Episode} />
      <EpisodeList id={id} Season={Season}/>
    </>
  )
}
