import useMovies from '@/hooks/use-movies';
import useTaggedMovies from '@/hooks/use-tagged-movies';
import useTags from '@/hooks/use-tags';
import useAuthStore from '@/store';
import { Box, createListCollection, Grid, GridItem, Heading, HStack, Icon, Input, InputGroup, Portal, Select, Separator, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GrUnsorted } from "react-icons/gr";
import { IoIosHeart } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { LuCalendarArrowDown, LuCalendarArrowUp } from "react-icons/lu";
import { PiVideoCameraFill } from "react-icons/pi";
import MoviesList from './MoviesCardContainer';
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';


const MovieContainer = () => {
    const { user } = useAuthStore()
    const { movies, error, isPending } = useMovies()
    const { taggedMovies } = useTaggedMovies(user.id)
    const { userTags } = useTags(user.id)

    const [filter, setFilter] = useState('all')
    const [sort, setSort] = useState('none')
    const [searchString, setSearchString] = useState('')

    const sortCollection = createListCollection({
        items: [
            { label: "Default", value: "none", icon: <GrUnsorted /> },
            { label: "Rating", value: "rating", icon: <BsSortNumericDown /> },
            { label: "Rating (descending)", value: "rating_desc", icon: <BsSortNumericUp /> },
            { label: "Release date", value: "year", icon: <LuCalendarArrowUp /> },
            { label: "Release date (descending)", value: "year_desc", icon: <LuCalendarArrowDown /> },
        ],
    })

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

        switch (sort) {
            case 'none':
                result.sort(
                    (a, b) => (b.id ?? 0) - (a.id ?? 0)
                ).reverse()
                break
            case 'rating_desc':
                result.sort(
                    (a, b) => (b.aggregate_rating ?? 0) - (a.aggregate_rating ?? 0)
                )
                break
            case 'rating':
                result.sort(
                    (a, b) => (b.aggregate_rating ?? 0) - (a.aggregate_rating ?? 0)
                ).reverse()
                break
            case 'year_desc':
                result.sort(
                    (a, b) => (b.start_year ?? 0) - (a.start_year ?? 0)
                )
                break
            case 'year':
                result.sort(
                    (a, b) => (b.start_year ?? 0) - (a.start_year ?? 0)
                ).reverse()
                break
        }

        if (searchString) {
            result = result.filter(movie => movie.primary_title?.toLowerCase()?.includes(searchString.toLowerCase()))
        }

        return result
    }, [filter, sort, searchString, movies, favouriteMovies, watchLaterMovies])


    return (
        <Grid
            templateAreas={{
                base: `"aside" "main"`,
                md: `"aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                sm: "1 fr",
                md: "240px 1fr",
                lg: "360px 1fr",
            }}
            minH="100vh"
        >
            <GridItem area="aside" p={4}>
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
                    <Link to={'/new_movie'}>
                        <HStack gapX={6}>
                            <Icon><IoAddCircleSharp size={24} /></Icon>
                            <Heading>Add a movie</Heading>
                        </HStack>
                    </Link>
                </VStack>
            </GridItem>

            <GridItem area="main"
                p={6}
                overflowX="hidden"
                display={'flex'}
                flexDirection={'column'}
                >
                <Heading size={'2xl'} mb={6}>Your movies</Heading>
                <Box
                    mb={8}
                    display={'flex'}
                    justifyContent={'center'}
                    gap={10}
                    flexWrap={{ base: "wrap", lg: "nowrap" }}
                    >
                    <InputGroup startElement={<FaMagnifyingGlass />} >
                        <Input placeholder="Search for title" size={'xl'} width="40rem" onChange={(event) => setSearchString(event.target.value)} />
                    </InputGroup>
                    <Select.Root collection={sortCollection} size="lg" width="20rem">
                        <Select.HiddenSelect />
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
                                            <HStack>
                                                {sortOption.icon}
                                                {sortOption.label}
                                            </HStack>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <MoviesList movies={visibleMovies} error={error} isPending={isPending}/>
                </Box>
            </GridItem>
        </Grid>
    )
}


export default MovieContainer