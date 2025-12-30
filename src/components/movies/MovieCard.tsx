import type { Movie } from "@/entities/Movie";
import { Box, Card, Icon, Image, Text } from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

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
                <Card.Footer display={'flex'} justifyContent={'space-between'}>
                    <Text color={'fg.muted'}>{movie.start_year}</Text>
                    <Box display={'flex'} gap={2}>
                        <Text color={'yellow.contrast'} bgColor={'yellow.focusRing'} borderRadius={'4px'} px={2}>{movie.aggregate_rating}</Text>
                        <Icon><CiHeart size={24} /></Icon>
                    </Box>
                </Card.Footer>
            </Link>
        </Card.Root>
    )
}

export default MovieCard