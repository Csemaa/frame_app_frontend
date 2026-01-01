import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Box p={5}>
        <Outlet/>
      </Box>
    </>
  )
}

export default App
