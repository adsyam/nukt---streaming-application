import { useParams } from "react-router"
import Navbar2 from "../components/Navbar2"
import MovieDetails from "../components/Watch_Movie/Movie_Details"
import MovieReviews from "../components/Watch_Movie/Movie_Reviews"
import EpisodeFrame from "../components/Watch_Series/EpisodeFrame"
import EpisodeList from "../components/Watch_Series/EpisodeList"
import Footer from '../components/Footer'

export default function WatchTVSeries() {
  const { id, Season, Episode } = useParams()

  return (
    <>
      <Navbar2 />
      <EpisodeFrame id={id} Season={Season} Episode={Episode} />
      <div className="flex mx-12 justify-center gap-4">
        <EpisodeList id={id} Season={Season} />
        <MovieDetails id={id} Season={Season} Episode={Episode}/>
      </div>
      <MovieReviews id={id} />
      <Footer />
    </>
  )
}
