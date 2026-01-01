import type { Movie } from "@/entities/Movie";
import type { CreatedUserTag } from "@/entities/UserTag";
import useRemoveTagMovie from "@/hooks/use-delete-tag-movie";
import useTagMovie from "@/hooks/use-post-tag-movie";
import useTags from "@/hooks/use-tags";
import useAuthStore from "@/store";
import { Box, Card, Icon, Image, Text } from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { IoMdEye } from "react-icons/io";

interface Props {
    movie: Movie
}

const MovieCard = ({ movie }: Props) => {
    const { user } = useAuthStore()
    const { userTags } = useTags(user.id)

    const usePostTag = useTagMovie(user.id)
    const removeTag = useRemoveTagMovie()

    const handleFavouriteClick = (movie: Movie) => {
        const alreadyFavourited = userTags?.find(ut => (ut.movie_id === movie.id && ut.tag === 'favourite'))
        if(!alreadyFavourited) {
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
        if(!alreadyWatchLatered) {
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

    //TODO only perform like when it is not liked, so check the database

    return (
        <Card.Root maxW={280}>
            {/*<Link to={`/movies/${movie.id}`}>*/}
            <Image src={movie.image_url} objectFit={'contain'} />
            <Card.Body gap={3}>
                <Card.Title
                    lineHeight={'1.3rem'}
                    minH={'2.6rem'}>
                    {movie.primary_title}
                </Card.Title>
            </Card.Body>
            <Card.Footer display={'flex'} justifyContent={'space-between'}>
                <Text color={'fg.muted'}>{movie.start_year}</Text>
                <Box display={'flex'} gap={2}>
                    <Text color={'yellow.contrast'} bgColor={'yellow.focusRing'} borderRadius={'4px'} px={2}>{movie.aggregate_rating}</Text>
                    <Icon onClick={() => handleFavouriteClick(movie)}><CiHeart size={24} /></Icon>
                    <Icon onClick={() => handleWatchLaterClick(movie)}><IoMdEye size={24} /></Icon>
                </Box>
            </Card.Footer>
            {/*</Link>*/}
        </Card.Root>
    )
}

export default MovieCard