import useAuthStore from '@/store'
import { getAvatar } from '@/utils/get-avatar';
import { Avatar, Box, Heading, HStack, Icon } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";

const Navbar = () => {
    const { user } = useAuthStore()
    return (
        <Box py={3} px={5} display={'flex'} justifyContent={'space-between'} bgColor={'bg.muted'} shadow={'xl'}>
            <HStack>
                <Icon size={'xl'}><MdMovie /></Icon>
                <Heading size={'3xl'}>Frame</Heading>
            </HStack>
            <Avatar.Root size={'lg'}>
                <Avatar.Fallback name={user.nickname} />
                <Avatar.Image src={getAvatar(user.profile_picture)} />
            </Avatar.Root>
        </Box>
    )
}

export default Navbar