import { Box } from "@chakra-ui/react"
import UserCards from "./UserCards"

const UserContainer = () => {
    return (
        <Box display={'flex'} justifyContent={'center'} minHeight={'90vh'} alignItems={'center'}>
            <UserCards />
        </Box>
    )
}

export default UserContainer