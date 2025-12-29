import type { Movie } from "@/entities/Movie";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMovies = () => {
    const fetchMovies = () => apiClient.get<Movie[]>('/movies').then(res => res.data)
    const { data: movies, error, isPending } = useQuery({
        queryKey: ['movies'],
        queryFn: fetchMovies,
        retry: 2
    })

    return { movies, error, isPending }
}

export default useMovies;