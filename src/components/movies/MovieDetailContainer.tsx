import { useParams } from 'react-router-dom'

const MovieDetailContainer = () => {
  const params = useParams()
  console.log(params)

  return (
    <>
        <video controls>
        <source
          src={`http://127.0.0.1:5000/api/movies/${11}/stream`}
          type="video/mp4"
        />
      </video>
    </>
  )
}

export default MovieDetailContainer