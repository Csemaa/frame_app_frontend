import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function UnAuthenticatedApp() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default UnAuthenticatedApp
