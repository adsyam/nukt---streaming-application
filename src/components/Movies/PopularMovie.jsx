import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const PopularMovie = () => {
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState("tv")

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${change}/popular`,
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
        setPopular(response.data.results)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [change])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      {!loading && (
        <motion.div className="flex justify-center w-full">
          <div className="text-white py-12 w-full gap-1">
            <div className="flex items-center px-2 justify-between mx-12">
              <div className="flex gap-2 items-center">
                <p className="text-2xl mb-1 font-medium">Popular</p>
                <div className="flex gap-2 px-3 py-1 rounded-md">
                  <button
                    onClick={() => setChange("tv")}
                    className={`${
                      change === "tv"
                        ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                        : null
                    } px-3 py-1 rounded-md`}
                  >
                    Series
                  </button>
                  <button
                    onClick={() => setChange("movie")}
                    className={`${
                      change === "movie"
                        ? "bg-[#ffffff30] px-3 py-1 rounded-md"
                        : null
                    } px-3 py-1 rounded-md`}
                  >
                    Movie
                  </button>
                </div>
              </div>
              <Link className="flex items-center gap-1" to={`/Search`}>
                <p>See all </p>
                <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
              </Link>
            </div>
            <div className="grid grid-cols-10 mx-12 gap-4">
              {popular
                .filter((pop) => pop.poster_path && pop.backdrop_path)
                .slice(0, 20)
                .map((pop, index) => (
                  <Link
                    href="#"
                    key={pop.id}
                    className="w-fit grid"
                    to={
                      change === "tv"
                        ? `/TVSeries/${pop.id}`
                        : `/Movie/${pop.id}`
                    }
                  >
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.07 }}
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                        alt={`${
                          pop.original_title || pop.original_name
                        } backdrop`}
                        width={215}
                        className="rounded-[5px] w-fit border-transparent box-border border-white"
                      />
                      <div>
                        <p className="word-break text-[16px] font-normal truncate-text">
                          {pop.original_title || pop.original_name}
                        </p>
                        <p className="text-sm opacity-50">
                          {(pop.release_date &&
                            pop.release_date.split("-")[0]) ||
                            (pop.first_air_date &&
                              pop.first_air_date.split("-")[0])}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default PopularMovie
