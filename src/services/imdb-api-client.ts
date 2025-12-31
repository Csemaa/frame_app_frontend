import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.imdbapi.dev'
})

export default apiClient;

