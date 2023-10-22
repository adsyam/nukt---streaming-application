import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Ripples } from "@uiball/loaders"

const TV = () => {
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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
        // console.log(response.data.results)
        setPopular(response.data.results)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="text-white py-12 w-full gap-1">
          <div className="flex items-center px-2">
            <p className="font-bold text-2xl">
              <span className="text-[#398FDD]">Movies</span> - Popular
            </p>
          </div>
          <div className="grid grid-cols-5 mx-12 gap-2">
            {popular
              .filter((pop) => pop.poster_path && pop.backdrop_path)
              .slice(0, 5)
              .map((pop) => (
                <Link
                  href="#"
                  key={pop.id}
                  className="w-fit grid"
                  to={`/VideoPage/${pop.id}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                      <Ripples size={80} speed={2} color="#398FDD" />
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                        alt={`${pop.original_title} backdrop`}
                        width={215}
                        className="rounded-[5px] w-fit hover:border-2 hover:transition-all border-transparent box-border border-white"
                      />
                      <div>
                        <p className="word-break w-[215px] text-[16px] font-normal ml-1 box-border">
                          {pop.original_title}
                        </p>
                        <p>{pop.release_date.split("-")[0]}</p>
                      </div>
                    </>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TV
