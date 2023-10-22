import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { MediaDetails, MediaFrame, MediaReviews } from "../components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar2"

export default function WatchMovie() {
  const { id, Season, Episode } = useParams()

  return (
    <>
      <Navbar />
      <MediaFrame id={id} Season={Season} Episode={Episode} />
      <div className="mx-20">
        <MediaDetails id={id} />
      </div>
      <MediaReviews id={id} />
      <Footer />
    </>
  )
}
