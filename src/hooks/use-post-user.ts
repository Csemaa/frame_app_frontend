import type { CreatedUser, User } from "@/entities/User"
import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const usePostUser = () => {
    const queryClient = useQueryClient()
    return useMutation<User, Error, CreatedUser>({
        mutationFn: (user: CreatedUser) => {
            return apiClient.post('/users/add', user).then(res => res.data)
        },
        onSuccess: (savedUser) => {
            queryClient.setQueryData<User[]>(['users'], users => [savedUser, ...(users || [])])
        },
        onError: (error: Error) => {
            console.error('Error: ' + error)
        }
    })
}

export default usePostUser;