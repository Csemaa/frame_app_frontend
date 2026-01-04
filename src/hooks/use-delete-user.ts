import type { User } from "@/entities/User"
import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation<User, Error, number>({
        mutationFn: (user_id: number) => {
            return apiClient.delete(`/users/${user_id}`).then(res => res.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            queryClient.invalidateQueries({ queryKey: ['tagged_movies'] })
        }
    }
    )

}

export default useDeleteUser