import type { UserTag } from "@/entities/UserTag";
import apiClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveTagMovie = () => {
  const queryClient = useQueryClient()

  return useMutation<UserTag, Error, number>({
    mutationFn: (tag_id: number) =>
      apiClient
        .delete<UserTag>(`/usertags/${tag_id}`)
        .then(res => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tagged_movies'],
      })

      queryClient.invalidateQueries({
        queryKey: ['tags'],
      })
    },
  })
}

export default useRemoveTagMovie