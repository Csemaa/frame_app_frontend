import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import usePostUser from "@/hooks/use-post-user"
import type { CreatedUser } from "@/entities/User"
import { Field, Input, Listbox, createListCollection, Image, Button, Box, Alert } from "@chakra-ui/react"
import { getAvatar } from "@/utils/get-avatar"
import { Link } from "react-router-dom"
import { Link as ChakraLink} from "@chakra-ui/react"

const profilePictureCollections = createListCollection({
    items: [
        {
            value: "1",
        },
        {
            value: "2",
        },
        {
            value: "3",
        },
        {
            value: "4",
        }
    ]
})

const schema = z.object({
    email: z.string().nullable(),
    nickname: z.string().min(1, "Nickname is required"),
    profile_picture: z.enum(profilePictureCollections.items.map(p => p.value)),
})

type FormData = z.infer<typeof schema>

const UserForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: null,
            nickname: '',
            profile_picture: '1',
        },
    })

    const addUser = usePostUser()

    const onSubmit = (data: FormData) => {
        const newUser: CreatedUser = {
            email: data.email,
            profile_picture: data.profile_picture,
            nickname: data.nickname
        }
        addUser.mutate(newUser)
        reset()
    }

    return (
        <Box display={'flex'} justifyContent={'center'} minHeight={'90vh'} alignItems={'center'}>
            <Box width={'36rem'} bgColor={'bg.subtle'} p={10} borderRadius={'20px'}>
                {addUser.isSuccess && 
                    <Alert.Root status="success" mb={4}>
                        <Alert.Indicator />
                        <Alert.Title>User added!
                            <Link to='/users'> Back to <ChakraLink variant="underline" colorPalette="teal">users</ChakraLink>
                            </Link>
                        </Alert.Title>
                    </Alert.Root>
                }
                {addUser.isError && 
                    <Alert.Root status="error" mb={4}>
                        <Alert.Indicator />
                        <Alert.Title>Failed to add user!</Alert.Title>
                    </Alert.Root>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field.Root mb={5} >
                        <Field.Label>
                            Email
                        </Field.Label>
                        <Input size="lg" placeholder="Enter your email" {...register("email")} variant="subtle" type="email" />
                        <Field.HelperText>We'll never share your email.</Field.HelperText>
                        {errors.email && <Field.ErrorText>{errors.email?.message}</Field.ErrorText>}
                    </Field.Root>

                    <Field.Root mb={5}>
                        <Field.Label>
                            Nickname <Field.RequiredIndicator />
                        </Field.Label>
                        <Input size="lg" placeholder="Nickname" {...register("nickname")} variant="subtle" />
                        <Field.HelperText>This will be your displayed name.</Field.HelperText>
                        {errors.nickname && <Field.ErrorText>{errors.nickname.message}</Field.ErrorText>}
                    </Field.Root>

                    <Listbox.Root orientation="horizontal" collection={profilePictureCollections} mb={5}>
                        <Listbox.Label>Select image</Listbox.Label>
                        <Listbox.Content>
                            {profilePictureCollections.items.map((p) => (
                                <Listbox.Item item={p} key={p.value} margin={0} display={'flex'} justifyContent={'center'}>
                                    <Image src={getAvatar(p.value)} alt={`avatar_${p.value}`}
                                        boxSize="70px"
                                        borderRadius={'50%'}
                                        gap={5}
                                        onClick={() => setValue('profile_picture', p.value)}
                                    />
                                </Listbox.Item>
                            ))}
                        </Listbox.Content>
                    </Listbox.Root>

                    <Button
                        colorPalette="teal"
                        type="submit"
                        loading={addUser.isPending}
                        loadingText="Loading"
                        spinnerPlacement="start"
                    >
                        Add
                    </Button>
                </form>
                
            </Box >
        </Box >
    )
}

export default UserForm


