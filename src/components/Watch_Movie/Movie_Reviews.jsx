import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { defprofile } from "../../assets"

export default function MovieReviews({ id }) {
  const [review, setReview] = useState([])
  const [showReviews, setShowReviews] = useState(false)
  const [expandedMap, setExpandedMap] = useState({})
  const [showRest, setShowRest] = useState(1)
  const [userData, setUserData] = useState(null)
  console.log(userData)

  const toggleExpanded = (reviewId) => {
    setExpandedMap((prevMap) => ({
      ...prevMap,
      [reviewId]: !prevMap[reviewId],
    }))
  }

  const toggleShowAll = () => {
    setShowReviews(!showReviews)

    if (showRest === 1) {
      setShowRest(Infinity)
    } else {
      setShowRest(1)
    }
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
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
        setReview(response.data.results)

        // const initialExpandedMap = {}
        // response.data.results.map((r) => {
        //   initialExpandedMap[r.id] = false
        // })
        // setExpandedMap(initialExpandedMap)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (review.length > 0) {
          const response = await fetch(
            `https://xsgames.co/randomusers/assets/avatars/male/${review.index}`
          )
          if (response.ok) {
            const data = await response.json()
            setUserData(response) // Assuming you want to store the first user data
            console.log(response)
          } else {
            // Handle errors here
          }
        }
      } catch (error) {
        // Handle network or other errors
      }
    }

    fetchData()
  }, [review.index])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", options)
  }

  return (
    <div className="my-12 mx-32 flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        <img src={defprofile} alt="" width={45} className="rounded-full" />
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md outline-none"
          placeholder="Write a review"
        />
      </div>
      <div>
        {review.slice(0, showRest).map((r, index) => (
          <motion.div
            key={r.id}
            className="flex flex-col gap-3"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <div className="text-white flex gap-2 ml-16">
              <div className="flex gap-3">
                <img
                  width={45}
                  height={45}
                  className="rounded-full"
                  src={
                    r.author_details.avatar_path === null
                      ? `${userData}`
                      : `https://secure.gravatar.com/avatar/${r.author_details.avatar_path}`
                  }
                />
                <div className="flex flex-col">
                  <p className="font-bold text-xl">
                    A review by{" "}
                    <span className="text-[#398FDD]">{r.author}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-thin text-sm">
                      Written on {formatDate(r.created_at)}
                    </p>
                    <div className="border w-fit px-2 rounded-full font-thin text-sm">
                      {r.author_details.rating === null
                        ? null
                        : r.author_details.rating}{" "}
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white mx-32 font-thin opacity-80 mb-4">
              {expandedMap[r.id]
                ? r.content
                : r.content.toString().split(" ").slice(0, 45).join(" ") +
                  "..."}
              <span
                role="button"
                onClick={() => toggleExpanded(r.id)}
                className="text-[#398FDD] italic "
              >
                {expandedMap[r.id] ? (
                  <>
                    <span className="mr-1">&nbsp;</span>
                    <span className="underline">show less</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1">&nbsp;</span>
                    <span className="underline">read the rest</span>
                  </>
                )}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
      <button onClick={toggleShowAll} className="text-white">
        {review.length === 0
          ? "There are no reviews"
          : !showReviews
          ? "Show All Reviews"
          : "Hide Reviews"}
      </button>
    </div>
  )
}