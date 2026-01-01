import useMovies from "@/hooks/use-movies"
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react"
import MovieCard from "./MovieCard"
import useTaggedMovies from "@/hooks/use-tagged-movies"
import useAuthStore from "@/store"
import useTags from "@/hooks/use-tags"

const MoviesList = () => {
    const { user } = useAuthStore()
    const { movies, error, isPending } = useMovies()
    const { taggedMovies } = useTaggedMovies(user.id || 1)

    const { userTags } = useTags(user.id || 1)

    const favouriteTags = userTags?.filter(ut => ut.tag === 'favourite')
    const favouriteMovieIds = favouriteTags?.map(ut => ut.movie_id)
    const favouriteMovies = taggedMovies?.filter(movie => favouriteMovieIds?.includes(movie.id))


    const watchLaterTags = userTags?.filter(ut => ut.tag === 'watch_later')
    const watchLaterMovieIds = watchLaterTags?.map(ut => ut.movie_id)
    const watchLaterMovies = taggedMovies?.filter(movie => watchLaterMovieIds?.includes(movie.id))



    if (error) {
        return <Text>Unexpected error: {error.message}</Text>
    }
    if (isPending) {
        return <Text>Loading...</Text>
    }

    if (movies && taggedMovies) {
        return (
            <>
                <Heading mb={5}>Your movies</Heading>
                <Grid display={'flex'} direction={'row'} gap={5}>
                    {movies.map(movie =>
                        <GridItem>
                            <MovieCard movie={movie} />
                        </GridItem>
                    )}
                </Grid>

                <Heading mb={5}>tagged movies</Heading>
                {<Grid display={'flex'} direction={'row'} gap={5}>
                    {taggedMovies?.map(movie =>
                        <GridItem>
                            <MovieCard movie={movie} />
                        </GridItem>
                    )}
                </Grid>}

                <Heading mb={5}>fav movies</Heading>
                {<Grid display={'flex'} direction={'row'} gap={5}>
                    {favouriteMovies?.map(movie =>
                        <GridItem>
                            <MovieCard movie={movie} />
                        </GridItem>
                    )}
                </Grid>}

                <Heading mb={5}>wl movies</Heading>
                {<Grid display={'flex'} direction={'row'} gap={5}>
                    {watchLaterMovies?.map(movie =>
                        <GridItem>
                            <MovieCard movie={movie} />
                        </GridItem>
                    )}
                </Grid>}
            </>
        )
    }
    return null;
}

export default MoviesList