import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import type { User } from "@/entities/User";

const useUsers = () => {
    const fetchUsers = () => apiClient.get<User[]>('/users')
        .then(res => res.data)

    const {data: users, error, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 2 * 60 * 60 * 1000 //2h
    })

    return {users, error, isPending }
}

export default useUsers;