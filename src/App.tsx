import { Box } from "@chakra-ui/react"
import UserCards from "./components/authentication/UserCards"
import UserForm from "./components/authentication/UserForm"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar/>
      <Box>
        <UserCards />
        <Box display={'flex'} justifyContent={'center'} mt={5}>
          <UserForm />
        </Box>
      </Box>
    </>
  )
}

export default App
