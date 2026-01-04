import { Box, createListCollection, Grid, GridItem, Heading, HStack, Icon, MenuItem, Portal, Select, Separator, VStack } from '@chakra-ui/react'
import MoviesList from './MoviesList'
import { PiVideoCameraFill } from "react-icons/pi";
import { IoIosHeart } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import useAuthStore from '@/store';
import useMovies from '@/hooks/use-movies';
import useTaggedMovies from '@/hooks/use-tagged-movies';
import useTags from '@/hooks/use-tags';
import { useMemo, useState } from 'react';

const MovieContainer = () => {
    const { user } = useAuthStore()
    const { movies, error, isPending } = useMovies()
    const { taggedMovies } = useTaggedMovies(user.id)
    const { userTags } = useTags(user.id)

    type Filter = 'all' | 'favourites' | 'watch_later'
    const [filter, setFilter] = useState<Filter>('all')

    const sortCollection = createListCollection({
        items: [
            { label: "Default", value: "none" },
            { label: "By rating", value: "rating" },
            { label: "Release date", value: "year" },
        ],
    })
    const [sort, setSort] = useState('none')


    const favouriteMovieIds = userTags?.filter(ut => ut.tag === 'favourite').map(ut => ut.movie_id)
    const favouriteMovies = taggedMovies?.filter(movie => favouriteMovieIds?.includes(movie.id))

    const watchLaterMovieIds = userTags?.filter(ut => ut.tag === 'watch_later').map(ut => ut.movie_id)
    const watchLaterMovies = taggedMovies?.filter(movie => watchLaterMovieIds?.includes(movie.id))
    
    const visibleMovies = useMemo(() => {
        if (!movies) return undefined

        let result = movies

        switch (filter) {
            case 'favourites':
                result = favouriteMovies || []
                break
            case 'watch_later':
                result = watchLaterMovies || []
                break
            default:
                result = movies
        }

        if (!result) return result

        const sorted = [...result]

        switch (sort) {
            case 'rating':
                sorted.sort(
                    (a, b) => (b.aggregate_rating ?? 0) - (a.aggregate_rating ?? 0)
                )
                break
            case 'year':
                sorted.sort(
                    (a, b) => (b.start_year ?? 0) - (a.start_year ?? 0)
                )
                break
        }

        return sorted
    }, [filter, sort, movies, favouriteMovies, watchLaterMovies])


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
                    <HStack gapX={6} onClick={() => setFilter('all')}>
                        <Icon><PiVideoCameraFill size={24} /></Icon>
                        <Heading cursor="pointer">Your movies</Heading>
                    </HStack>

                    <HStack gapX={6} onClick={() => setFilter('favourites')}>
                        <Icon><IoIosHeart size={24} /></Icon>
                        <Heading cursor="pointer">Favourites</Heading>
                    </HStack>

                    <HStack gapX={6} onClick={() => setFilter('watch_later')}>
                        <Icon><IoEyeSharp size={24} /></Icon>
                        <Heading cursor="pointer">Watch later</Heading>
                    </HStack>

                    <Separator />
                    <HStack gapX={6}>
                        <Icon><PiVideoCameraFill size={24} /></Icon>
                        <Heading>Add a movie</Heading>
                    </HStack>
                </VStack>
            </GridItem>

            <GridItem area="main" p={6} overflowX="hidden" display={'flex'} justifyContent={'center'}>
                <Heading size="sm" mb={2}>
                    Sort movies
                </Heading>
                <Select.Root collection={sortCollection} size="sm" width="320px">
                    <Select.HiddenSelect />
                    <Select.Label>Sort by</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Sort by" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {sortCollection.items.map((sortOption) => (
                                    <Select.Item item={sortOption} key={sortOption.value} onClick={() => setSort(sortOption.value)}>
                                        {sortOption.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <MoviesList movies={visibleMovies} error={error} isPending={isPending} />
            </GridItem>
        </Grid>
    )
}


export default MovieContainer