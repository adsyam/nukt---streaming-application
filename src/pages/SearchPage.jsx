import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Navbar2 from "../components/Navbar2"
import { motion } from "framer-motion"

export default function SearchPage() {
  const { query } = useParams()

  const [type, setType] = useState("Movie")
  const [page, setPage] = useState(1)
  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: `${query}`,
        include_adult: "false",
        language: "en-US",
        page: `${page}`,
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
        setMovieData(response.data.results)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error)
        setLoading(false)
      })
  }, [query])

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

  return (
    <>
      <Navbar2 />
      {!loading && (
        <div className="flex justify-center w-full">
          <div className="text-white py-12 w-full gap-1">
            <div className="flex items-center px-2">
              <p className="font-bold text-2xl">
                Showing Results for{" "}
                <span className="text-[#398FDD]">{query}</span>
              </p>
            </div>
            <div className="grid grid-cols-10 grid-rows-1 mx-12 gap-4">
              {movieData
                .filter((t) => t.poster_path && t.backdrop_path)
                .map((t, index) => (
                  <Link
                    href="#"
                    key={t.id}
                    className="w-fit grid"
                    to={`/VideoPage/${t.id}`}
                  >
                    <motion.div
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.07 }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${t.poster_path}`}
                        alt={`${t.original_title} backdrop`}
                        width={215}
                        className="rounded-[5px] w-fit border-transparent box-border border-white"
                      />
                      <div>
                        <p className="word-break text-[16px] font-normal truncate-text">
                          {t.original_title}
                        </p>
                        <p className="text-sm opacity-50">
                          {t.release_date.split("-")[0]}
                        </p>
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
