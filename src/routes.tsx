import { createBrowserRouter } from "react-router-dom"
import MoviesList from "./components/movies/MoviesList"
import UserCards from "./components/authentication/UserCards";
import MovieDetailContainer from "./components/movies/MovieDetailContainer";
import MovieForm from "./components/movies/MovieForm";
import UserForm from "./components/authentication/UserForm";
import App from "./App";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/movies',
        element: <MoviesList />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetailContainer />,
      },
      {
        path: '/new_movie',
        element: <MovieForm />,
      },
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
])

export default router;