import type {  User } from "@/entities/User"
import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const usePutUser = () => {
    const queryClient = useQueryClient()
    return useMutation<User, Error, User>({
        mutationFn: (user: User) => {
            return apiClient.put(`/users/${user.id}`, user).then(res => res.data)
        },
        onSuccess: (savedUser) => {
            queryClient.setQueryData<User[]>(['users'], users => [savedUser, ...(users || [])])
        },
        onError: (error: Error) => {
            console.error('Error: ' + error)
        }
    })
}

export default usePutUser;