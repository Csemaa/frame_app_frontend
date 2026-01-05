import type { Movie } from "@/entities/Movie";
import { Box, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FavouriteIcon from "../tagging/FavouriteIcon";
import WatchLaterIcon from "../tagging/WatchLaterIcon";

interface Props {
    movie: Movie
}

const MovieCard = ({ movie }: Props) => {
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
                    <FavouriteIcon movie={movie}/>
                    <WatchLaterIcon movie={movie}/>
                </Box>
            </Card.Footer>
        </Card.Root>
    )
}

export default MovieCard