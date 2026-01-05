import type { Movie } from '@/entities/Movie'
import type { CreatedUserTag } from '@/entities/UserTag'
import useRemoveTagMovie from '@/hooks/use-delete-tag-movie'
import useTagMovie from '@/hooks/use-post-tag-movie'
import useTags from '@/hooks/use-tags'
import useAuthStore from '@/store'
import { Icon } from '@chakra-ui/react'
import { IoEyeSharp, IoEyeOutline } from 'react-icons/io5'
import { Tooltip } from '../ui/tooltip'

interface Props {
    movie: Movie
}

const WatchLaterIcon = ({ movie }: Props) => {
    const { user } = useAuthStore()
    const { userTags } = useTags(user.id)

    const usePostTag = useTagMovie(user.id)
    const removeTag = useRemoveTagMovie()

    const watchLaterMoveIds = userTags?.filter(ut => ut.tag === 'watch_later').map(ut => ut.movie_id)

    const handleWatchLaterClick = (movie: Movie) => {
        const alreadyWatchLatered = userTags?.find(ut => (ut.movie_id === movie.id && ut.tag === 'watch_later'))
        if (!alreadyWatchLatered) {
            const newTag: CreatedUserTag = {
                user_id: user.id,
                movie_id: movie.id,
                tag: 'watch_later'
            }
            usePostTag.mutate(newTag)
        } else {
            removeTag.mutate(alreadyWatchLatered.id)
        }
    }
    return (
        <Tooltip
            content="Watch later"
            positioning={{ placement: "top" }}
        >
            <Icon onClick={() => handleWatchLaterClick(movie)}>
                {watchLaterMoveIds?.includes(movie.id) ? <IoEyeSharp size={24} /> : <IoEyeOutline size={24} />}
            </Icon>
        </Tooltip>
    )
}

export default WatchLaterIcon