export interface User {
    id: number
    email: string | undefined
    nickname: string
    profile_picture: string
}

export interface CreatedUser {
    email: string | null
    nickname: string
    profile_picture: string
}