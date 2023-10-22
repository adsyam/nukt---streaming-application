import { useState, useEffect } from "react"
import axios from "axios"
import { TOKEN_AUTH } from "../constants/apiConfig"

export const usePopular = () => {



      useEffect(() => {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/movie/popular",
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: `${TOKEN_AUTH}`,
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
  return 
}
