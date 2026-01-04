import { Navigate, Outlet, useNavigation } from "react-router-dom"
import Navbar from "./components/Navbar"
import useAuthStore from "./store"

function App() {
    const { user } = useAuthStore()
    if (!user.id)
        return <Navigate to={'/users'} replace></Navigate>

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
