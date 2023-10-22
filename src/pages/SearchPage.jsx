import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import Navbar2 from "../components/Navbar2"

import axios from "axios"
import { motion } from "framer-motion"
import MovieSection from "../components/Search Sections/MovieSection"
import TVSeriesSection from "../components/Search Sections/TVSeriesSection"

export default function SearchPage() {
  const { query } = useParams()

  const [movieData, setMovieData] = useState([])
  const [tvData, setTvData] = useState([])

  const [hovered, setHovered] = useState(false)
  const variants = {
    initial: {
      opacity: 0,
    },
    hovered: {
      opacity: 1,
    },
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: `${query}`,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmYzMzZmYzc2MzIyMDIyYmY0OTdiZmYwMmRiZWQ1YSIsInN1YiI6IjY1MjQwYTE2MGNiMzM1MTZmNjNiMTZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5E0K7l1TaIxgmhI98EM6y2mvcmuLcJTxdlRHI8u5Qac",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setMovieData(
          response.data.results.filter((md) => md.media_type === "movie")
        )
        setTvData(response.data.results.filter((md) => md.media_type === "tv"))
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [query])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div
    //   onMouseEnter={() => setHovered(true)}
    //   onMouseLeave={() => setHovered(false)}
    //   variants={variants}
    //   animate={hovered ? "hovered" : "initial"}
    //   style={{
    //     backgroundImage: `url(${
    //       hovered
    //         ? movieData.poster_path || movieData.backdrop_path
    //         : tvData.poster_path || tvData.backdrop_path
    //     })`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     height: "100vh",
    //     position: "absolute",
    //     zIndex: "-1",
    //   }}
    >
      <Navbar2 />
      <div className="text-white my-12 ">
        <section className="flex gap-1 mx-12">
          <p>Showing results for</p>
          <p className="text-[#398FDD]">&quot;{query}&quot;</p>
        </section>
        <section className="mb-12 ">
          <h2 className="mx-12">Movie</h2>
          <div className="grid grid-cols-10 mx-12 gap-4">
            {movieData
              .filter((md) => md.poster_path && md.backdrop_path)
              .map((md, index) => (
                <MovieSection
                  key={index}
                  MovieID={md.id}
                  index={index}
                  poster={md.poster_path}
                  backdrop={md.backdrop_path}
                  title={md.original_title}
                  date1={md.release_date}
                  date2={md.first_air_date}
                  animation={fadeInVariants}
                />
              ))}
          </div>
        </section>
        <section className="mb-12 ">
          <h2 className="mx-12">TV Series</h2>
          <div className="grid grid-cols-10 mx-12 gap-4">
            {tvData
              .filter((tv) => tv.poster_path && tv.backdrop_path)
              .map((tv, index) => (
                <TVSeriesSection
                  key={index}
                  tvID={tv.id}
                  index={index}
                  poster={tv.poster_path}
                  backdrop={tv.backdrop_path}
                  title={tv.original_name}
                  date1={tv.release_date}
                  date2={tv.first_air_date}
                  animation={fadeInVariants}
                />
              ))}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
