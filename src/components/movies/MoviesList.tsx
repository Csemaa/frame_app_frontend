import useMovies from "@/hooks/use-movies"
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import MovieCard from "./MovieCard"

const MoviesList = () => {

    const { movies, error, isPending } = useMovies()

    if (error) {
        return <Text>Unexpected error: {error.message}</Text>
    }
    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (movies) {
        return (
            <>
                <Heading>Your movies</Heading>
                <Grid display={'flex'} direction={'row'} gap={5}>
                    {movies.map(movie =>
                        <GridItem>
                            <MovieCard movie={movie} />
                        </GridItem>
                    )}
                </Grid>
            </>
        )
    }
    return null;
}

export default MoviesList