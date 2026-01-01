import type { CreatedUserTag, UserTag } from "@/entities/UserTag";
import apiClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useTagMovie = (user_id: number) => {
  const queryClient = useQueryClient()

  return useMutation<UserTag, Error, CreatedUserTag>({
    mutationFn: (newUserTag) =>
      apiClient
        .post<UserTag>('/usertags/', newUserTag)
        .then(res => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tagged_movies', user_id],
      })

      queryClient.invalidateQueries({
        queryKey: ['tags', user_id],
      })
    }
  })
}

export default useTagMovie