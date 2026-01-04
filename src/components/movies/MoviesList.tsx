import type { Movie } from "@/entities/Movie"
import { GridItem, SimpleGrid, Skeleton, SkeletonText, Text } from "@chakra-ui/react"
import MovieCard from "./MovieCard"

interface Props {
    movies: Movie[] | undefined
    error: Error | null
    isPending: boolean
}

const MoviesList = ({ movies, error, isPending }: Props) => {
    if (error) {
        return <Text>Unexpected error: {error.message}</Text>
    }

    if (isPending) {
        const skeletonList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        return <>
            <SimpleGrid
                columns={{ base: 8, sm: 2, md: 3, lg: 4, xl: 6 }}
                gap={5}
            >
                {skeletonList.map(s => (
                    <GridItem key={s}>
                        <Skeleton w={'280px'} h={'400px'} />
                        <SkeletonText noOfLines={2} mt={3} />
                    </GridItem>
                ))}
            </SimpleGrid>
        </>
    }

    if (movies && movies.length == 0) {
        return <Text>You dont have any movies here</Text>
    }

    if (movies) {
        return (
            <>
                <SimpleGrid
                    columns={{ base: 8, sm: 2, md: 3, lg: 4, xl: 6 }}
                    gap={5}
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
}

export default MoviesList