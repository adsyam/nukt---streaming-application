import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "swiper/css"
import "swiper/css/effect-fade"
import { Autoplay, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const Carousel = () => {
  const [carousel, setCarousel] = useState([])
  const [loading, setLoading] = useState(true)

  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ]

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: "1" },
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
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      {!loading && (
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          className="mySwiper"
        >
          {carousel.map((c, index) => (
            <SwiperSlide key={c.id} className="text-white">
              <img
                className="w-full h-[90vh] object-cover relative brightness-50 object-top"
                src={`https://image.tmdb.org/t/p/original/${c.backdrop_path}`}
                alt={`${c.original_title} backdrop`}
              />
              <div className="absolute z-10 bottom-0 m-10 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-[68px] font-bold break-words w-[50%]">
                    {c.original_title}
                  </p>
                  <div>
                    <p className="text-[18px]">SYNOPSIS:</p>
                    <p className="text-[16px] break-words font-thin w-[60%]">
                      {c.overview}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
                      to={`/VideoPage/${c.id}`}
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
      )}
    </>
  )
}

export default Carousel
