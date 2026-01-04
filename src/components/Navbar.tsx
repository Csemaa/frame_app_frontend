import useAuthStore from '@/store'
import { getAvatar } from '@/utils/get-avatar';
import { Avatar, Box, Button, CloseButton, Dialog, Heading, HStack, Icon, Menu, Portal, Separator, Text } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import useDeleteUser from '@/hooks/use-delete-user';
import { toaster } from "@/components/ui/toaster"

const Navbar = () => {
    const { user, logout } = useAuthStore()
    const deleteUser = useDeleteUser()

    return (
        <Box py={3} px={5} display={'flex'} justifyContent={'space-between'} bgColor={'bg.subtle'}>
            <HStack>
                <Icon size={'xl'}><MdMovie /></Icon>
                <Heading size={'3xl'}>Frame</Heading>
            </HStack>
            {user.id &&
                <Dialog.Root
                    placement={'center'}
                    motionPreset="slide-in-bottom"
                >
                    <Menu.Root positioning={{ placement: "right-end" }}>
                        <Menu.Trigger rounded="full" focusRing="outside">
                            <Avatar.Root size={'lg'}>
                                <Avatar.Fallback name={user.nickname} />
                                <Avatar.Image src={getAvatar(user.profile_picture)} />
                            </Avatar.Root>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="account"><IoIosPerson /> Edit account</Menu.Item>
                                    <Menu.Item value="logout" onClick={() => logout()}><TbLogout /> Log out</Menu.Item>
                                    <Dialog.Trigger asChild>
                                        <Menu.Item value="delete" color={'red.500'}><TbLogout /> Delete account</Menu.Item></Dialog.Trigger>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Delete account?</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Text>
                                        This action will be permanently delete your account and tagged movies.
                                        <Separator my={3} />
                                        Do you proceed?
                                    </Text>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </Dialog.ActionTrigger>
                                    <Button colorPalette={'red'} onClick={() => { deleteUser.mutate(user.id); logout() }}> Delete</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            }
        </Box>

    )
}

export default Navbar