import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import usePostUser from "@/hooks/use-post-user"
import type { CreatedUser } from "@/entities/User"

const profilePictureOptions: string[] = ["1", "2", "3", "4"]

const schema = z.object({
    email: z.string().nullable(),
    nickname: z.string().min(1, "Nickname is required"),
    profile_picture: z.enum(profilePictureOptions),
})

type FormData = z.infer<typeof schema>

const UserForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
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
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email")}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Nickname</label>
                    <input
                        type="text"
                        {...register("nickname")}
                    />
                    {errors.nickname && <p>{errors.nickname.message}</p>}
                </div>

                <div>
                    <label>Profile Picture</label>
                    <select {...register("profile_picture")}>
                        {profilePictureOptions.map(ppo => <option value={ppo}>{ppo}</option>)}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default UserForm


