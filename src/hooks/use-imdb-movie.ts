import type { FullImdbMovie } from "@/entities/ImdbMovie"
import apiClient from "@/services/imdb-api-client"
import { useQuery } from "@tanstack/react-query"

const useImdbMovie = (imdb_id: string) => {
    const fetchMovie = () => apiClient.get<FullImdbMovie>(`/titles/${imdb_id}`).then(res => res.data)
    const { data: imdbMovie, error, isPending} =  useQuery({
        queryKey: ['imdb_movie', imdb_id],
        queryFn: fetchMovie
    })

    return { imdbMovie, error, isPending }
}

export default useImdbMovie