import useUsers from "@/services/use-users"

const UserCards = () => {
  const { users, error, isPending } = useUsers()

  if (isPending) return <p>Loading</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      {users?.map(user => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  )
}

export default UserCards
