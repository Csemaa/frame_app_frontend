import { createBrowserRouter } from "react-router-dom"
import MovieDetailContainer from "./components/movie/MovieDetailContainer";
import MovieForm from "./components/movies/MovieForm";
import UserForm from "./components/authentication/UserForm";
import App from "./App";
import MovieContainer from "./components/movies/MoviesContainer";
import UnAuthenticatedApp from "./UnAuthenticatedApp";
import UserCards from "./components/authentication/UserCards";

const router = createBrowserRouter([
  {
    path: '/',
    element: <UnAuthenticatedApp />,
    children: [
      {
        path: '/users',
        element: <UserCards />,
      },
      {
        path: '/new_user',
        element: <UserForm />,
      }
    ]
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/movies',
        element: <MovieContainer />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetailContainer />,
      },
      {
        path: '/new_movie',
        element: <MovieForm />,
      }
    ]
  },
])

export default router;