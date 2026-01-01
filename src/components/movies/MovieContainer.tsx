import { Box, Grid, GridItem, Heading, HStack, Icon, MenuItem, Separator, VStack } from '@chakra-ui/react'
import MoviesList from './MoviesList'
import { PiVideoCameraFill } from "react-icons/pi";
import { IoIosHeart } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import useAuthStore from '@/store';
import useMovies from '@/hooks/use-movies';
import useTaggedMovies from '@/hooks/use-tagged-movies';
import useTags from '@/hooks/use-tags';
import { useState } from 'react';
import type { Movie } from '@/entities/Movie';

const MovieContainer = () => {
    const { user } = useAuthStore()
    const { movies, error, isPending } = useMovies()
    const { taggedMovies } = useTaggedMovies(user.id)
    const { userTags } = useTags(user.id)

    const [visibleMovies, setVisibleMovies] = useState<Movie[] | undefined>(movies)

    const favouriteMovieIds = userTags?.filter(ut => ut.tag === 'favourite').map(ut => ut.movie_id)
    const favouriteMovies = taggedMovies?.filter(movie => favouriteMovieIds?.includes(movie.id))

    const watchLaterMovieIds = userTags?.filter(ut => ut.tag === 'watch_later').map(ut => ut.movie_id)
    const watchLaterMovies = taggedMovies?.filter(movie => watchLaterMovieIds?.includes(movie.id))

    return (
        <Grid
            templateAreas={{
                base: `"aside" "main"`,
                md: `"aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                md: "180px 1fr",
                lg: "360px 1fr",
            }}
            minH="100vh"
        >
            <GridItem area="aside" p={4} bgColor={'bg.subtle'}>
                <VStack align="stretch" gap={6} pl={6}>
                    <Heading py={2}>Welcome, {user.nickname}!</Heading>
                    <Separator />
                    <HStack gapX={6} onClick={() => setVisibleMovies(movies)}>
                        <Icon><PiVideoCameraFill size={24} /></Icon>
                        <Heading cursor={'pointer'}>Your movies</Heading>
                    </HStack>
                    <HStack gapX={6} onClick={() => setVisibleMovies(favouriteMovies)}>
                        <Icon><IoIosHeart size={24} /></Icon>
                        <Heading cursor={'pointer'}>Favourites</Heading>
                    </HStack>
                    <HStack gapX={6} onClick={() => setVisibleMovies(watchLaterMovies)}>
                        <Icon><IoEyeSharp size={24} /></Icon>
                        <Heading cursor={'pointer'}>Watch later</Heading>
                    </HStack>
                    <Separator />
                    <HStack gapX={6}>
                        <Icon><PiVideoCameraFill size={24} /></Icon>
                        <Heading>Add a movie</Heading>
                    </HStack>
                </VStack>
            </GridItem>

            <GridItem area="main" p={6} overflowX="hidden" display={'flex'} justifyContent={'center'}>
                <MoviesList movies={visibleMovies} error={error} isPending={isPending} />
            </GridItem>
        </Grid>
    )
}


export default MovieContainer