import type { Movie } from "@/entities/Movie"
import apiClient from "@/services/api-client"
import { useQuery } from "@tanstack/react-query"

const useTaggedMovies = (user_id: number) => {

    const fetchTaggedMovies = (user_id: number) => 
        apiClient.get<Movie[]>(`/usertags/${user_id}/movies`).then(res => res.data)

    const { data: taggedMovies, error, isPending } = useQuery({
        queryKey: ['tagged_movies', user_id],
        queryFn: () => fetchTaggedMovies(user_id),
    })

    return { taggedMovies, error, isPending }
}

export default useTaggedMovies