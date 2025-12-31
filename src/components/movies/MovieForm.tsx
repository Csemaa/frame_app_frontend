import type { ImdbMovie } from '@/entities/ImdbMovie'
import type { CreatedMovie, Movie } from '@/entities/Movie'
import useImdbSearchTitle from '@/hooks/use-imdb-search-title'
import usePostMovie from '@/hooks/use-post-movie'
import { Box, Button, Card, Field, Input, SimpleGrid, Image, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

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
        if (selectedMovie){
            const newMovie: CreatedMovie = {
                path: data.path,
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
        <Box display={'flex'} justifyContent={'center'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field.Root mb={4}>
                    <Field.Label>
                        Path <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Path" {...register("path")} variant="subtle" />
                    {errors.path && <Field.ErrorText>{errors.path.message}</Field.ErrorText>}
                </Field.Root>

                <Field.Root mb={4}>
                    <Field.Label>
                        Search for your movie <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="searchstring" onChange={(event) => setSearchString(event.target.value)} variant="subtle" />
                </Field.Root>

                {error && <Text color={'red'}>Couldnt load titles: {error.message}</Text>}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 4, lg: 6 }}
                    gap={3}
                    my={30}
                >
                    {titles?.map(title => (
                        <Card.Root maxW={230}
                                onClick={() => setSelectedMovie(title)}
                                cursor={'pointer'}>
                            <Image src={title.primaryImage?.url} objectFit={'fill'} minH={'410px'}/>
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

                <Button
                    colorPalette="teal"
                    type="submit"
                    loadingText="Loading"
                    spinnerPlacement="start"
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default MovieForm