import useUsers from "@/hooks/use-users"
import useAuthStore from "@/store"
import { getAvatar } from "@/utils/get-avatar"
import { Box, Card, Heading, Image, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const UserCards = () => {
  const { login } = useAuthStore()
  const { users, error, isPending } = useUsers()
  const skeletonArray = [1, 2, 3, 4];
  if (isPending) return (
    <Box p={3}>
      <Heading size={'3xl'} my={5}>Loading...</Heading>
      <Box display={'flex'} alignItems={'center'} gap={4} my={5}>
        {
          skeletonArray.map(e =>
            <Card.Root key={e} width={'20rem'}>
              <Card.Body>
                <Box display={'flex'} alignItems={'center'} gap={4}>
                  <SkeletonCircle size="70px" />
                  <SkeletonText noOfLines={1} />
                </Box>
              </Card.Body>
            </Card.Root>
          )
        }
      </Box>
    </Box>
  )

  if (error) return <Text color={'red'}>{error.message}</Text>

  if (!users) {
    return <Heading>No users added yet</Heading>
  }

  return (
    <Box p={3}>
      <Heading fontSize={'2rem'} my={5}>Select a user</Heading>
      <Box display={'flex'} alignItems={'center'} gap={4}>
        {users.map(user => (
          <Link to='/movies'>
            <Card.Root key={user.id} width={'20rem'} onClick={() => login(user)}>
              <Card.Body>
                <Box display={'flex'} alignItems={'center'} gap={4}>
                  <Image
                    src={(getAvatar(user.profile_picture))}
                    alt="User avatar"
                    boxSize="70px"
                    borderRadius={'50%'}
                  />
                  <Card.Title>{user.nickname}</Card.Title>
                </Box>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default UserCards
