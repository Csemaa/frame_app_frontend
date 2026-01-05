import useUsers from "@/hooks/use-users"
import useAuthStore from "@/store"
import { getAvatar } from "@/utils/get-avatar"
import { Box, Card, GridItem, Heading, Icon, Image, SimpleGrid, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { IoAddCircleSharp } from "react-icons/io5";


const UserCards = () => {
  const { login } = useAuthStore()
  const { users, error, isPending } = useUsers()
  const skeletonArray = [1, 2, 3, 4];
  if (isPending) return (
    <Box display={'flex'} justifyContent={'center'} minHeight={'90vh'} alignItems={'center'}>
      <Box>
        <Heading fontSize={'2rem'} my={8}>Loading...</Heading>
        <Box display={'flex'} alignItems={'center'} gap={4}>
          {
            skeletonArray.map(e =>
              <Card.Root key={e} width={'18rem'}>
                <Card.Body>
                  <Box display={'flex'} alignItems={'center'} gap={10} flexDirection={'column'} p={12}>
                    <SkeletonCircle size="120px" />
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Card.Body>
              </Card.Root>
            )
          }
        </Box>
      </Box>
    </Box>
  )

  if (error) return <Text color={'red'}>{error.message}</Text>

  if (!users) {
    return (
      <Box display={'flex'} justifyContent={'center'} minHeight={'90vh'} alignItems={'center'}>
        <Box>
          <Heading fontSize={'2rem'} my={8}>Select a user</Heading>
          <Box display={'flex'} alignItems={'center'} gap={4}>
            <Link to='/new_user'>
              <Card.Root width={'18rem'}>
                <Card.Body>
                  <Box display={'flex'} alignItems={'center'} gap={10} flexDirection={'column'} p={12}>
                    <Icon color="bg.emphasized">
                      <IoAddCircleSharp
                        size="120px"
                      />
                    </Icon>
                    <Card.Title fontSize={'1.6rem'}>Add user</Card.Title>
                  </Box>
                </Card.Body>
              </Card.Root>
            </Link>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box display={'flex'} justifyContent={'center'} minHeight={'90vh'} alignItems={'center'}>
      <Box>
        <Heading fontSize={'2rem'} my={8}>Select a user</Heading>
        <Box display={'flex'} alignItems={'center'} gap={4}>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: users.length >= 4 ? 5 : users.length + 1 }}
            gap={5}
          >
            {users.map(user => (
              <GridItem>
                <Link to='/'>
                  <Card.Root key={user.id} width={'18rem'} onClick={() => login(user)}>
                    <Card.Body>
                      <Box display={'flex'} alignItems={'center'} gap={10} flexDirection={'column'} p={12}>
                        <Image
                          src={(getAvatar(user.profile_picture))}
                          alt="User avatar"
                          boxSize="120px"
                          borderRadius={'50%'}
                        />
                        <Card.Title fontSize={'1.6rem'}>{user.nickname}</Card.Title>
                      </Box>
                    </Card.Body>
                  </Card.Root>
                </Link>
              </GridItem>
            ))}
            <GridItem>
              <Link to='/new_user'>
                <Card.Root width={'18rem'}>
                  <Card.Body>
                    <Box display={'flex'} alignItems={'center'} gap={10} flexDirection={'column'} p={12}>
                      <Icon color="bg.emphasized">
                        <IoAddCircleSharp
                          size="120px"
                        />
                      </Icon>
                      <Card.Title fontSize={'1.6rem'}>Add user</Card.Title>
                    </Box>
                  </Card.Body>
                </Card.Root>
              </Link>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default UserCards
