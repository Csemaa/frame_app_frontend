import { Box } from "@chakra-ui/react"
import UserCards from "./components/authentication/UserCards"
import Navbar from "./components/Navbar"
import MoviesList from "./components/movies/MoviesList"

function App() {

  return (
    <>
      <Navbar />
      <Box p={5}>
        <UserCards />
        <MoviesList />
      </Box>
    </>
  )
}

export default App
