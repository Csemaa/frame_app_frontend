import type { Movie } from "@/entities/Movie"
import { GridItem, SimpleGrid, Text } from "@chakra-ui/react"
import MovieCard from "./MovieCard"

interface Props {
    movies: Movie[] | undefined
    error: Error | null
    isPending: boolean
}

const MoviesList = ({movies, error, isPending}: Props) => {

    if (error) {
        return <Text>Unexpected error: {error.message}</Text>
    }
    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (movies) {
        return (
            <>
                <SimpleGrid
                    columns={{ base: 8, sm: 2, md: 3, lg: 4, xl: 6 }}
                    gapX={5}
                >
                    {movies.map(movie => (
                        <GridItem key={movie.id}>
                            <MovieCard movie={movie} />
                        </GridItem>
                    ))}
                </SimpleGrid>
            </>
        )
    }
    return null;
}

export default MoviesList