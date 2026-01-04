import { createBrowserRouter } from "react-router-dom"
import UserCards from "./components/authentication/UserCards";
import MovieDetailContainer from "./components/movies/MovieDetailContainer";
import MovieForm from "./components/movies/MovieForm";
import UserForm from "./components/authentication/UserForm";
import App from "./App";
import MovieContainer from "./components/movies/MovieContainer";
import UnAuthenticatedApp from "./UnAuthenticatedApp";

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