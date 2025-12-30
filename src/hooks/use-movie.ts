import type { Movie } from "@/entities/Movie";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const useMovie = (id: number | undefined) => {
    const fetchMovie = () => apiClient.get<Movie>(`/movies/${id}`).then(res => res.data)
    const { data: movie, error, isPending } = useQuery({
        queryKey: ['movie', id],
        queryFn: fetchMovie,
        retry: 1
    })

    return { movie, error, isPending }
}

export default useMovie;