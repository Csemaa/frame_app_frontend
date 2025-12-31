import { createBrowserRouter } from "react-router-dom"
import MoviesList from "./components/movies/MoviesList"
import UserCards from "./components/authentication/UserCards";
import MovieDetailContainer from "./components/movies/MovieDetailContainer";
import MovieForm from "./components/movies/MovieForm";

const router = createBrowserRouter([
  {
    path: '/movies',
    element: <MoviesList />,
  },
  {
    path: '/movies/:id',
    element: <MovieDetailContainer />,
  },
  {
    path: '/new',
    element: <MovieForm />,
  },
  {
    path: '/',
    element: <UserCards />,
  },
])

export default router;