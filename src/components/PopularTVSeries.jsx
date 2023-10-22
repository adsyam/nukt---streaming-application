import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const PopularTVSeries = () => {
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular",
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
  }, [])

  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <>
      {!loading && (
        <div className="flex justify-center w-full">
          <div className="text-white py-12 w-full gap-1">
            <div className="flex items-center px-2">
              <p className="font-bold text-2xl">
                <span className="text-[#398FDD]">TV Series</span> - Popular
              </p>
            </div>
            <div className="grid grid-cols-10 mx-12 gap-2">
              {popular
                .filter((pop) => pop.poster_path && pop.backdrop_path)
                .slice(0, 20)
                .map((pop, index) => (
                  <Link
                    href="#"
                    key={pop.id}
                    className="w-fit grid"
                    to={`/SeriesPage/${pop.id}`}
                  >
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.07 }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                        alt={`${pop.original_title} backdrop`}
                        width={215}
                        className="rounded-[5px] w-fit hover:border-2 hover:transition-all border-transparent box-border border-white"
                      />
                      <div>
                        <p className="word-break text-[16px] font-normal ml-1 box-border">
                          {pop.name}
                        </p>
                        <p>{pop.first_air_date.split("-")[0]}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopularTVSeries
