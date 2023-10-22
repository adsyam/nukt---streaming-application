import axios from "axios";
import { BASE_URL, TOKEN_AUTH } from "./apiConfig";

const apiService = axios.create({
    baseURL: BASE_URL,
    params: {
        language: "en-US"
    },
    headers: {
        accept: 'application/json',
        Authorization: TOKEN_AUTH
    }
})

export const searchQuery = (query, page) => {
    return apiService.get("/search/multi", {
        params: {
            query: query,
            include_adult: "true",
            page: page,
        }
    })
}
