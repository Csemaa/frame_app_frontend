import useImdbMovie from '@/hooks/use-imdb-movie';
import useMovie from '@/hooks/use-movie';
import { Avatar, Blockquote, Box, Button, Heading, HStack, Icon, Image, Separator, Text } from '@chakra-ui/react';
import { FaPlayCircle, FaStar } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';

const MovieDetailContainer = () => {
  const { id } = useParams()
  const movieId = id ? parseInt(id) : undefined

  const { movie } = useMovie(movieId)
  const { imdbMovie } = useImdbMovie(movie?.imdb_id || '')


  if (!imdbMovie) {
    return null
  }

  return (
    <>
      <Box m={10} mx={20}>
        <Box display={'flex'} gap={12} bgColor={'bg.muted'} p={3} borderRadius={'5px'}>
          <Image src={imdbMovie.primaryImage.url} maxWidth={'400px'} borderRadius={'5px'} />
          <Box>
            <Heading size={'6xl'} mb={3}>{imdbMovie.primaryTitle}</Heading>
            <Separator mb={3}/>

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
            <Separator mb={3}/>
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
                        <Avatar.Image src={star.primaryImage?.url} />
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
                        <Avatar.Image src={star.primaryImage?.url} />
                      </Avatar.Root>
                      <Text color={'fg.muted'} textStyle={'sm'}>{star.displayName}</Text>
                    </Box>
                  )}
                </HStack>
              </Box>
            }
            <Box display={'flex'} gap={5}>
              <Link to={`/play/${movie?.id}`}>
              <Button colorPalette="red" variant="solid" size={'xl'}>
                <FaPlayCircle /> Start playing
              </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MovieDetailContainer