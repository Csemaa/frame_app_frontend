import useImdbMovie from '@/hooks/use-imdb-movie'
import useMovie from '@/hooks/use-movie'
import { useParams } from 'react-router-dom'

const MoviePlayer = () => {
  const { id } = useParams()
  const movieId = id ? parseInt(id) : undefined

  const { movie } = useMovie(movieId)
  const { imdbMovie } = useImdbMovie(movie?.imdb_id || '')


  if (!imdbMovie) {
    return null
  }

  return (
    <div>
        <video controls>
            <source
            src={`http://127.0.0.1:5000/api/movies/${movie?.id}/stream`}
            type="video/mp4"
            />
      </video>
    </div>
  )
}

export default MoviePlayer