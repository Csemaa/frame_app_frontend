import type { ImdbMovie } from "@/entities/ImdbMovie";
import apiClient from "@/services/imdb-api-client";
import { useQuery } from "@tanstack/react-query";

export interface ImdbBaseResponse {
    titles: ImdbMovie[]
}

const useImdbSearchTitle = (query: string) => {
    const fetchFoundTitles = () => apiClient.get<ImdbBaseResponse>('/search/titles', { params: { query, limit: 10 } }).then(res => res.data.titles)
    const { data: titles, error, isPending } = useQuery({
        queryKey: ['foundTitles', query],
        queryFn: fetchFoundTitles
    })

    return { titles, error, isPending }
}

export default useImdbSearchTitle;