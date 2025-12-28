import { useQuery } from "@tanstack/react-query";
import apiClient from "./api-client";
import type { User } from "@/entities/User";

const useUsers = () => {
    const fetchUsers = () => apiClient.get<User[]>('/users')
        .then(res => res.data)

    const {data: users, error, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    return {users, error, isPending }
}

export default useUsers;