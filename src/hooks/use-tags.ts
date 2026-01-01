import type { UserTag } from "@/entities/UserTag"
import apiClient from "@/services/api-client"
import { useQuery } from "@tanstack/react-query"

const useTags = (user_id: number) => {

    const fetchUserTags = (user_id: number) => 
        apiClient.get<UserTag[]>(`/usertags/${user_id}`).then(res => res.data)

    const { data: userTags, error, isPending } = useQuery({
        queryKey: ['tags', user_id],
        queryFn: () => fetchUserTags(user_id),
    })

    return { userTags, error, isPending }
}

export default useTags