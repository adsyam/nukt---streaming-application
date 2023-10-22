import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { loader_Lava, loader_Magnify, loader_Wave, loader_Cine } from "../assets/index"
import { genres } from "../constants/GenreList"
import { Player, Controls } from "@lottiefiles/react-lottie-player"

const Carousel = () => {
  const [carousel, setCarousel] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/all/day",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmYzMzZmYzc2MzIyMDIyYmY0OTdiZmYwMmRiZWQ1YSIsInN1YiI6IjY1MjQwYTE2MGNiMzM1MTZmNjNiMTZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5E0K7l1TaIxgmhI98EM6y2mvcmuLcJTxdlRHI8u5Qac",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setCarousel(response.data.results)
        setTimeout(() => {
          setLoading(false)
        }, 1600)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {!loading ? (
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          className="mySwiper h-[70vh]"
        >
          {carousel
            .filter((c) => c.media_type === "tv" || "movie")
            .map((c) => (
              <SwiperSlide key={c.id} className="text-white">
                <img
                  className="w-full h-[70vh] object-cover relative brightness-50 object-top"
                  src={`https://image.tmdb.org/t/p/original/${c.backdrop_path}`}
                  alt={`${c.original_title} backdrop`}
                />
                <div className="absolute z-10 bottom-0 m-10 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <p className="text-[68px] font-bold break-words w-[50%]">
                      {c.original_title || c.original_name}
                    </p>
                    <div>
                      <p className="text-[18px]">SYNOPSIS:</p>
                      <p className="text-[16px] break-words font-thin w-[60%]">
                        {c.overview}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-[18px] bg-[#DADADA40] py-1 px-2 rounded-[3px] font-medium">
                        {c.media_type === "tv" ? "SERIES" : "MOVIE"}
                      </p>
                      {genres
                        .filter((g) => c.genre_ids.includes(g.id))
                        .map((genre) => (
                          <p
                            className="text-[18px] bg-[#DADADA40] py-1 px-2 rounded-[3px] font-medium"
                            key={genre.id}
                          >
                            {genre.name}
                          </p>
                        ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        className="bg-white py-2 px-4 rounded-[3px] shadow-inner font-bold cursor-pointer text-black"
                        // onClick={() => handleClick(c.id)}
                        to={
                          c.media_type === "tv"
                            ? `/TVSeries/${c.id}`
                            : `/Movie/${c.id}`
                        }
                        scroll={true}
                      >
                        WATCH NOW
                      </Link>
                      <button className="bg-white py-2 px-4 rounded-[3px] shadow-inner font-bold text-black">
                        WATCH TRAILER
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Player autoplay loop src={loader_Cine} className="flex items-center justify-center w-[30%] h-[70vh]"></Player>
      )}
    </>
  )
}

export default Carousel
