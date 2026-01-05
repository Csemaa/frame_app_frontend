import useImdbMovie from '@/hooks/use-imdb-movie'
import useMovie from '@/hooks/use-movie'
import { API_BASE_URL } from '@/services/constants'
import { Blockquote, Box, Heading, HStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import FavouriteIcon from '../tagging/FavouriteIcon'
import WatchLaterIcon from '../tagging/WatchLaterIcon'

const MoviePlayer = () => {
  const { id } = useParams()
  const movieId = id ? parseInt(id) : undefined

  const { movie } = useMovie(movieId)
  const { imdbMovie } = useImdbMovie(movie?.imdb_id || '')


  if (!imdbMovie || !movie) {
    return null
  }

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Box maxW="1800px" p={5} bgColor={'bg.subtle'} borderRadius={10}>
        <video controls style={{ width: "100%" }}>
          <source
            src={`${API_BASE_URL}/movies/${movie.id}/stream`}
            type={movie.mimetype}
          />
        </video>
        <Box mt={5}>
          <Box display={'flex'} justifyContent={'space-between'} p={4}>
            <Heading size="2xl" mb={3} >
              {movie.primary_title}
            </Heading>
            <HStack>
                <FavouriteIcon movie={movie}/>
                <WatchLaterIcon movie={movie}/>
            </HStack>
          </Box>
          <Blockquote.Root mb={8}>
            <Blockquote.Content>
              {imdbMovie.plot}
            </Blockquote.Content>
          </Blockquote.Root>
        </Box>
      </Box>
    </Box>

  )
}

export default MoviePlayer