import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function EpisodeList({ id, Season }) {
  const [data, setData] = useState({})
  const defSeason = Season > 1 ? Season : "1"
  const [selectedSeason, setSelectedSeason] = useState(defSeason)
  
//   const defSeason = () => {
//     if (Season > 1) {
//         setSelectedSeason(1)
//     } else {
//         selectedSeason(Season)
//     }
//   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}`,
          {
            params: {
              api_key: "52f336fc76322022bf497bff02dbed5a",
              append_to_response: "season",
            },
          }
        )

        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="text-white border flex flex-col w-fit rounded-md">
      {data.seasons ? (
        <div className="p-2 rounded-md">
          <select
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason}
            className="bg-[#ffffff0] rounded-md p-1 text-black"
          >
            {data.seasons.map((season) => (
              <option key={season.id} value={season.season_number}>
                Season {season.season_number}
              </option>
            ))}
          </select>
          {selectedSeason && (
            <ul>
              {data.seasons
                .filter(
                  (season) => season.season_number === Number(selectedSeason)
                )
                .map((season) => (
                  <li key={season.id}>
                    {season.episode_count > 0 && (
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        <ul className="flex flex-col">
                          {Array.from(
                            { length: season.episode_count },
                            (_, index) => (
                              <Link
                                to={`/TVSeries/${id}/${selectedSeason}/${
                                  index + 1
                                }`}
                                key={index}
                              >
                                Episode {index + 1}
                              </Link>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
