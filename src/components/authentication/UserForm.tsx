import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import usePostUser from "@/hooks/use-post-user"
import type { CreatedUser } from "@/entities/User"
import { Field, Input, Listbox, createListCollection, Image, Button } from "@chakra-ui/react"
import { getAvatar } from "@/utils/get-avatar"

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
            nickname: "",
            profile_picture: "1",
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
        <>
            {addUser.isSuccess && <p>Request was successfull</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field.Root mb={4}>
                    <Field.Label>
                        Email
                    </Field.Label>
                    <Input placeholder="Enter your email" {...register("email")} variant="subtle" type="email" />
                    <Field.HelperText>We'll never share your email.</Field.HelperText>
                    {errors.email && <Field.ErrorText>{errors.email?.message}</Field.ErrorText>}
                </Field.Root>

                <Field.Root mb={4}>
                    <Field.Label>
                        Nickname <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="This will be your displayed name" {...register("nickname")} variant="subtle" />
                    {errors.nickname && <Field.ErrorText>{errors.nickname.message}</Field.ErrorText>}
                </Field.Root>

                <Listbox.Root orientation="horizontal" collection={profilePictureCollections} mb={4}>
                    <Listbox.Label>Select image</Listbox.Label>
                    <Listbox.Content>
                    {profilePictureCollections.items.map((p) => (
                        <Listbox.Item item={p} key={p.value} margin={0}>
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
                Submit
                </Button>

            </form>
        </>
    )
}

export default UserForm


