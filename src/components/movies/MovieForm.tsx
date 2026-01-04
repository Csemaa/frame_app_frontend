import type { ImdbMovie } from '@/entities/ImdbMovie'
import type { CreatedMovie, Movie } from '@/entities/Movie'
import useImdbSearchTitle from '@/hooks/use-imdb-search-title'
import usePostMovie from '@/hooks/use-post-movie'
import { Box, Button, Card, Field, Input, SimpleGrid, Image, Text, Heading, Grid, GridItem, Alert } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Link as ChakraLink} from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const schema = z.object({
    path: z.string(),
})

type FormData = z.infer<typeof schema>

const MovieForm = () => {
    const [searchString, setSearchString] = useState<string>('')
    const [selectedMovie, setSelectedMovie] = useState<ImdbMovie>()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema), defaultValues: {
            path: undefined,
        }
    })

    const postMovie = usePostMovie()

    const { titles, error, isPending } = useImdbSearchTitle(searchString)

    const onSubmit = (data: FormData) => {
        console.log(data)
        if (selectedMovie) {
            const newMovie: CreatedMovie = {
                path: data.path.replace('/"', ''),
                mimetype: 'video/mp4', //TODO
                last_time_viewed: null,
                imdb_id: selectedMovie?.id,
                image_url: selectedMovie.primaryImage.url,
                image_height: selectedMovie.primaryImage.height,
                image_width: selectedMovie.primaryImage.width,
                primary_title: selectedMovie.primaryTitle,
                start_year: selectedMovie.startYear,
                aggregate_rating: selectedMovie.rating?.aggregateRating
            }
            postMovie.mutate(newMovie)
            reset()
        }
    }

    return (
        <Grid
            templateAreas={{
                base: `"movieform" "main"`,
                md: `"movieform main"`,
            }}
            templateColumns={{
                base: "1fr",
                md: "280px 1fr",
                lg: "500px 1fr",
            }}
            minH="100vh"
        >
            <GridItem area="movieform" p={4} bgColor={'bg.subtle'}>
                <Box bgColor={'bg.subtle'} p={10} borderRadius={'20px'}>
                    {postMovie.isSuccess && 
                    <Alert.Root status="success" mb={4}>
                        <Alert.Indicator />
                        <Alert.Title>User added!
                            <Link to='/movies'> Back to <ChakraLink variant="underline" colorPalette="teal">movies</ChakraLink>
                            </Link>
                        </Alert.Title>
                    </Alert.Root>
                }
                {postMovie.isError && 
                    <Alert.Root status="error" mb={4}>
                        <Alert.Indicator />
                        <Alert.Title>Failed to add user!</Alert.Title>
                    </Alert.Root>
                }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Field.Root mb={6}>
                            <Field.Label>
                                Path <Field.RequiredIndicator />
                            </Field.Label>
                            <Input placeholder="Path" {...register("path")} variant="subtle" size={'lg'} />
                            {errors.path && <Field.ErrorText>{errors.path.message}</Field.ErrorText>}
                        </Field.Root>

                        <Field.Root mb={6}>
                            <Field.Label>
                                Search for your movie <Field.RequiredIndicator />
                            </Field.Label>
                            <Input placeholder="Type title here" size={'lg'} onChange={(event) => setSearchString(event.target.value)} variant="subtle" />
                        </Field.Root>

                        <Box mb={6}>
                            {selectedMovie?.primaryTitle ?
                                <Text textStyle="md">Your selected movie: {selectedMovie?.primaryTitle} ({selectedMovie?.startYear})</Text> :
                                <Text textStyle="md">You don't have any movie selected</Text>
                            }
                        </Box>

                        <Button
                            colorPalette="teal"
                            type="submit"
                            loading={postMovie.isPending}
                            loadingText="Loading"
                            spinnerPlacement="start"
                        >
                            Add movie
                        </Button>
                    </form>
                </Box>
            </GridItem>
            <GridItem area="main" p={4} overflowX="hidden" mx={'auto'}>
                {error && <Text color={'red.400'}>Couldnt load titles: {error.message}</Text>}
                <SimpleGrid
                    columns={{ base: 0, sm: 2, md: 2, lg: 4, xl: 7 }}
                    gap={5}
                    mt={10}
                >
                    {titles?.map(title => (
                        <Card.Root maxW={230}
                            onClick={() => setSelectedMovie(title)}
                            cursor={'pointer'}>
                            <Image src={title.primaryImage?.url} objectFit={'fill'} minH={'410px'} />
                            <Card.Body gap={3}>
                                <Card.Title
                                    lineHeight={'1.3rem'}
                                    minH={'2.6rem'}>
                                    {title.primaryTitle}
                                </Card.Title>
                            </Card.Body>
                            <Card.Footer display={'flex'} justifyContent={'space-between'}>
                                <Text color={'fg.muted'}>{title.startYear}</Text>
                                <Box display={'flex'} gap={2}>
                                    <Text color={'yellow.contrast'} bgColor={'yellow.focusRing'} borderRadius={'4px'} px={2}>{title.rating?.aggregateRating}</Text>
                                </Box>
                            </Card.Footer>
                        </Card.Root>
                    ))}
                </SimpleGrid>
            </GridItem>
        </Grid>


    )
}

export default MovieForm