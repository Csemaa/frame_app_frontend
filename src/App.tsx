import { Box } from "@chakra-ui/react"
import UserCards from "./components/authentication/UserCards"
import UserForm from "./components/authentication/UserForm"

function App() {

  return (
    <>
      <UserCards/>
      <Box display={'flex'} justifyContent={'center'} mt={5}>
        <UserForm />
      </Box>
    </>
  )
}

export default App
