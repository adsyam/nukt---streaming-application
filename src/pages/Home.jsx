import { Navbar, Carousel, Popular, Trending, TopRated } from "../components"


export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <div>
        <Popular />
        <Trending />
        <TopRated />
      </div>
    </>
  )
}
