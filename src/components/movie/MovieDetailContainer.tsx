import useImdbMovie from '@/hooks/use-imdb-movie'
import useMovie from '@/hooks/use-movie'
import { Box, Heading, Icon, Image, Text, VStack, HStack, Blockquote, Button, Avatar } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";

const MovieDetailContainer = () => {
  const { id } = useParams()
  const movieId = id ? parseInt(id) : undefined

  const { movie, error, isPending } = useMovie(movieId)
  const { imdbMovie } = useImdbMovie(movie?.imdb_id || '')


  if (!imdbMovie) {
    return null
  }

  return (
    <>
      <Box m={10} mx={20}>
        <Box display={'flex'} gap={12}>
          <Image src={imdbMovie.primaryImage.url} maxWidth={'400px'} borderRadius={'5px'} />
          <Box>
            <Heading size={'6xl'} mb={3}>{imdbMovie.primaryTitle}</Heading>
            <HStack mb={3}>
              <Icon><FaStar /></Icon>
              <Text color={'yellow.contrast'} bgColor={'yellow.focusRing'} borderRadius={'4px'} px={2}>{imdbMovie.rating?.aggregateRating}</Text>
              {imdbMovie.rating?.voteCount ? <Text color={'fg.muted'}> | {imdbMovie.rating?.voteCount} votes</Text> : null}
            </HStack>
            <HStack mb={8}>
              <Icon><MdCalendarMonth /></Icon>
              <Text color={'fg.muted'}>{imdbMovie.startYear}</Text>
            </HStack>
            <Blockquote.Root mb={8}>
              <Blockquote.Content>
                {imdbMovie.plot}
              </Blockquote.Content>
            </Blockquote.Root>
            {imdbMovie.stars &&
              <Box mb={8}>
                <Heading size={'md'} mb={5}>Stars</Heading>
                <HStack gap={8}>
                  {imdbMovie.stars.map(star =>
                    <Box display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Avatar.Root size={'lg'} key={star.id}>
                        <Avatar.Fallback name={star.displayName} />
                        <Avatar.Image src={star.primaryImage.url}/>
                      </Avatar.Root>
                      <Text color={'fg.muted'} textStyle={'sm'}>{star.displayName}</Text>
                    </Box>
                  )}
                </HStack>
              </Box>
            }
            {imdbMovie.directors &&
              <Box mb={8}>
                <Heading size={'md'} mb={5}>Directors</Heading>
                <HStack gap={8}>
                  {imdbMovie.directors.map(star =>
                    <Box display={'flex'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Avatar.Root size={'lg'} key={star.id}>
                        <Avatar.Fallback name={star.displayName} />
                        <Avatar.Image src={star.primaryImage.url}/>
                      </Avatar.Root>
                      <Text color={'fg.muted'} textStyle={'sm'}>{star.displayName}</Text>
                    </Box>
                  )}
                </HStack>
              </Box>
            }
            <Button colorPalette="red" variant="solid" size={'xl'}>
              <FaPlayCircle /> Start playing
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MovieDetailContainer