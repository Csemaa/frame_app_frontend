import type { Movie, CreatedMovie } from "@/entities/Movie";
import apiClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostMovie = () => {
    const queryClient = useQueryClient()
    return useMutation<Movie, Error, CreatedMovie>({
        mutationFn: (movie: CreatedMovie) => apiClient.post<Movie>('/movies/add', movie).then(res => res.data),
        mutationKey: ['movies'],
        onSuccess: (savedMovie) => {
            queryClient.setQueryData<Movie[]>(['movies'], movies => [savedMovie, ...(movies || [])])
        }
    })
}

export default usePostMovie;