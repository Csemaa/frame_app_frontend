import type { Movie } from "@/entities/Movie";
import type { CreatedUserTag } from "@/entities/UserTag";
import useRemoveTagMovie from "@/hooks/use-delete-tag-movie";
import useTagMovie from "@/hooks/use-post-tag-movie";
import useTags from "@/hooks/use-tags";
import useAuthStore from "@/store";
import { Box, Card, Icon, Image, Text } from "@chakra-ui/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Props {
    movie: Movie
}

const MovieCard = ({ movie }: Props) => {
    const { user } = useAuthStore()
    const { userTags } = useTags(user.id)

    const usePostTag = useTagMovie(user.id)
    const removeTag = useRemoveTagMovie()

    const favouriteMoveIds = userTags?.filter(ut => ut.tag === 'favourite').map(ut => ut.movie_id)
    const watchLaterMoveIds = userTags?.filter(ut => ut.tag === 'watch_later').map(ut => ut.movie_id)


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
        <Card.Root maxW={280}>
            <Link to={`/movies/${movie.id}`}>
                <Image src={movie.image_url} objectFit={'contain'} />
                <Card.Body gap={3}>
                    <Card.Title
                        lineHeight={'1.3rem'}
                        minH={'2.6rem'}>
                        {movie.primary_title}
                    </Card.Title>
                </Card.Body>
            </Link>
            <Card.Footer display={'flex'} justifyContent={'space-between'}>
                <Text color={'fg.muted'}>{movie.start_year}</Text>
                <Box display={'flex'} gap={2}>
                    <Text color={'yellow.contrast'} bgColor={'yellow.focusRing'} borderRadius={'4px'} px={2}>{movie.aggregate_rating}</Text>
                    <Icon onClick={() => handleFavouriteClick(movie)}>
                        {favouriteMoveIds?.includes(movie.id) ? <IoIosHeart size={24} color={'#cf0000ff'} /> : <IoIosHeartEmpty size={24} />}
                    </Icon>
                    <Icon onClick={() => handleWatchLaterClick(movie)}>
                        {watchLaterMoveIds?.includes(movie.id) ? <IoEyeSharp size={24} /> : <IoEyeOutline size={24} />}
                    </Icon>
                </Box>
            </Card.Footer>
        </Card.Root>
    )
}

export default MovieCard