import useMovie from '@/hooks/use-movie'
import { Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const MovieDetailContainer = () => {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)

  const { movie } = useMovie(movieId)
  return (
    <>
        <Heading>{movie?.primary_title}</Heading>
        <video controls>
        <source
          src={`http://127.0.0.1:5000/api/movies/${movie?.id}/stream`}
          type="video/mp4"
        />
      </video>
    </>
  )
}

export default MovieDetailContainer