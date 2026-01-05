import type { Movie } from '@/entities/Movie'
import type { CreatedUserTag } from '@/entities/UserTag'
import useRemoveTagMovie from '@/hooks/use-delete-tag-movie'
import useTagMovie from '@/hooks/use-post-tag-movie'
import useTags from '@/hooks/use-tags'
import useAuthStore from '@/store'
import { Icon } from '@chakra-ui/react'
import { Tooltip } from "@/components/ui/tooltip"
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

interface Props {
    movie: Movie
}

const FavouriteIcon = ({ movie }: Props) => {
    const { user } = useAuthStore()
    const { userTags } = useTags(user.id)

    const usePostTag = useTagMovie(user.id)
    const removeTag = useRemoveTagMovie()

    const favouriteMoveIds = userTags?.filter(ut => ut.tag === 'favourite').map(ut => ut.movie_id)

    const handleFavouriteClick = (movie: Movie) => {
        const alreadyFavourited = userTags?.find(ut => (ut.movie_id === movie.id && ut.tag === 'favourite'))
        if (!alreadyFavourited) {
            const newTag: CreatedUserTag = {
                user_id: user.id,
                movie_id: movie.id,
                tag: 'favourite'
            }
            usePostTag.mutate(newTag)
        } else {
            removeTag.mutate(alreadyFavourited.id)
        }
    }

    return (
        <Tooltip
            content="Add to favourites"
            positioning={{ placement: "top" }}
        >
            <Icon onClick={() => handleFavouriteClick(movie)}>
                {favouriteMoveIds?.includes(movie.id) ? <IoIosHeart size={24} color={'#cf0000ff'} /> : <IoIosHeartEmpty size={24} />}
            </Icon>
        </Tooltip>
    )
}

export default FavouriteIcon;