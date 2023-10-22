import { Navbar, Carousel, Popular, Trending, TopRated, Footer } from "../components"


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
      <Footer />
    </>
  )
}
